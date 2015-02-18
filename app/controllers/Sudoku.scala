package controllers

import controllers.Application.Puzzle

import scala.annotation.tailrec
import scala.collection.mutable

/**
 * Created by haha on 2015/2/14.
 */
class Sudoku private(val puzzle: Puzzle) {
  import controllers.Sudoku._
//  require(arr.length == 9 && arr(0).length == 9)
  private val EmptySetInt = Set.empty[Int]
  private val initial = {
    val probs = Set(1,2,3,4,5,6,7,8,9)
    val temp = Array.tabulate(9, 9){
      (r, c) => Ele(r, c, 3 * (r / 3) + (c / 3), EmptySetInt, 0)
    }

    for{
      row <- puzzle.rows
      r = row.rid
      col <- row.cols
      c = col.cid
      vl = col.vl
      if vl != 0
    }{
      temp(r)(c) = Ele(r, c, 3 * (r / 3) + (c / 3), EmptySetInt, vl)
    }

    val tSet = temp.flatten.toSet

    Vector.tabulate(9, 9){
      (r, c) => {
        val idx = 3 * (r / 3) + (c / 3)
        Ele(r, c, idx, if(temp(r)(c).value == 0) probs -- tSet.filter(e => e.row == r || e.col == c || e.idx == idx).map(_.value).toSet else EmptySetInt, temp(r)(c).value)
      }
    }.flatten.toSet
  }

  def solution() = {

    @inline
    def vdi0(set: Set[Ele]):Boolean = {
      val ff = set.groupBy(_.value).filter(_._2.size > 1)
      for((key, value) <- ff) {
        if(value.groupBy(_.row).exists(_._2.size > 1)) return true
        if(value.groupBy(_.col).exists(_._2.size > 1)) return true
        if(value.groupBy(_.idx).exists(_._2.size > 1)) return true
      }
      false
    }

    @inline
    def vdi(set: Set[(Ele, Set[Int])]):Boolean = {
      val ff = set.groupBy(_._2.head).filter(_._2.size > 1)
      for((key, value) <- ff) {
        if(value.groupBy(_._1.row).exists(_._2.size > 1)) return true
        if(value.groupBy(_._1.col).exists(_._2.size > 1)) return true
        if(value.groupBy(_._1.idx).exists(_._2.size > 1)) return true
      }
      false
    }

    @inline
    def vdi2(set: Set[Ele]):Boolean = {
      val ff = set.groupBy(_.probabilities.head).filter(_._2.size > 1)
      for((key, value) <- ff) {
        if(value.groupBy(_.row).exists(_._2.size > 1)) return true
        if(value.groupBy(_.col).exists(_._2.size > 1)) return true
        if(value.groupBy(_.idx).exists(_._2.size > 1)) return true
      }
      false
    }

    @inline
    def vdi3(map: mutable.OpenHashMap[Ele, Int]):Boolean = {
      val ff = map.groupBy(_._2).filter(_._2.size > 1)
      for((key, value) <- ff) {
        if(value.groupBy(_._1.row).exists(_._2.size > 1)) return true
        if(value.groupBy(_._1.col).exists(_._2.size > 1)) return true
        if(value.groupBy(_._1.idx).exists(_._2.size > 1)) return true
      }
      false
    }

    @tailrec
    def help(cur: Option[(Set[Ele], Set[Ele])], lStates: List[(Set[Ele], Set[Ele], Ele)]): Option[Set[Ele]] = {
      cur match {
        case None =>
          lStates match {
            case head :: tail =>
              val lCertain = head._1
              val lUncertain = head._2
              val lEle = head._3
              val pb = lEle.probabilities.head
              val pbs = lEle.probabilities - pb
              val (olds, stay) = lUncertain.partition(e => e.row == lEle.row || e.col == lEle.col || e.idx == lEle.idx)
              val news = olds.map(e => e.createNew(e.probabilities - pb, 0))
              val nEle = lEle.createNew(pbs, pb)
              help(Some((lCertain + nEle, stay ++ news)), if (pbs.nonEmpty) (lCertain, lUncertain, nEle) :: tail else tail)
            case Nil =>
              None
          }
        case Some((certain, uncertain)) =>
          if (uncertain.isEmpty) {
            if(validate(certain))
              Some(certain)
            else
              None
          } else {
            val mostCrt = uncertain.minBy(_.probabilities.size)
            if (mostCrt.probabilities.size == 0) {
              help(None, lStates)
            } else {
              val mostCrtOne = uncertain.filter(_.probabilities.size == 1)
              if (vdi2(mostCrtOne)) {
                help(None, lStates)
              } else {
                val idxSet = uncertain.groupBy(_.idx)
                val rowSet = uncertain.groupBy(_.row)
                val colSet = uncertain.groupBy(_.col)
                val survivorAll = uncertain.map {
                  case ele =>
                    val peers = (rowSet.get(ele.row) :: colSet.get(ele.col) :: idxSet.get(ele.idx) :: Nil).flatten.map(e => (e - ele).flatMap(_.probabilities))
                    (ele, ele.probabilities -- peers.minBy(_.size))
                }
                val survivor = survivorAll.filter(_._2.size == 1)
                if (survivorAll.exists(_._2.size > 1) || vdi(survivor)) {
                  help(None, lStates)
                } else {
                  val map = new mutable.OpenHashMap[Ele, Int]()
                  for (ele <- mostCrtOne) {
                    map.update(ele, ele.probabilities.head)
                  }
                  if (survivor.exists(ele => map.contains(ele._1) && map.get(ele._1).get != ele._2.head)) {
                    help(None, lStates)
                  } else {
                    for ((ele, pbs) <- survivor) {
                      map.update(ele, pbs.head)
                    }
                    if (vdi3(map)) {
                      help(None, lStates)
                    } else if (map.nonEmpty) {
                      var uc = uncertain -- map.keySet
                      var rc = certain
                      map.foreach {
                        case (ele, pb) =>
                          val (olds, stay) = uc.partition(e => e.row == ele.row || e.col == ele.col || e.idx == ele.idx)
                          val news = olds.map(e => e.createNew(e.probabilities - pb, 0))
                          rc += ele.createNew(EmptySetInt, pb)
                          uc = stay ++ news
                      }
                      help(Some((rc, uc)), lStates)
                    } else {
                      val remainSet = uncertain - mostCrt
                      val pb = mostCrt.probabilities.head
                      val (olds, stay) = remainSet.partition(e => e.row == mostCrt.row || e.col == mostCrt.col || e.idx == mostCrt.idx)
                      val news = olds.map(e => e.createNew(e.probabilities - pb, 0))
                      help(Some((certain + mostCrt.createNew(EmptySetInt, pb), stay ++ news)), (certain, remainSet, mostCrt.createNew(mostCrt.probabilities - pb, 0)) :: lStates)
                    }
                  }
                }
              }
            }
          }
        }
      }

    val t = initial.partition(_.value != 0)
    if(vdi0(t._1)) None
    else help(Some((t._1, t._2)), Nil)
  }

}

object Sudoku{
  class Ele private (val row: Int, val col: Int, val idx: Int, val probabilities: Set[Int], val value: Int){
    def createNew(probs: Set[Int], vl: Int) = Ele(row, col, idx, probs, vl)
    override def toString = s"$row,$col,$value"
  }
  object Ele{
    def apply(row: Int, col: Int, idx: Int, probabilities: Set[Int], value: Int) = new Ele(row, col, idx, probabilities, value)
  }
  def apply(puzzle: Puzzle) = new Sudoku(puzzle)

  def validate(set: Set[Ele]) =
    (0 until 9).forall{
      idx =>
        val s = set.filter(_.idx == idx)
        s.size == 9 && s.map(_.value).toSet.size == 9
    }

}