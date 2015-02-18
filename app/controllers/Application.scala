package controllers

import play.api.libs.json._
import play.api.libs.json.Reads._
import play.api.libs.functional.syntax._
import play.api.mvc._
import scala.util.Try

object Application extends Controller {

  case class Col(cid: Int, vl: Int)
  case class Row(rid: Int, cols: List[Col])
  case class Puzzle(rows: List[Row])
  case class Solution(solvable: Boolean, puzzle: Puzzle)

  implicit val ColWriters = Json.writes[Col]
  implicit val RowWriters = Json.writes[Row]
  implicit val PuzzleWriters = Json.writes[Puzzle]
  implicit val SolutionWriters = Json.writes[Solution]
  implicit val ColReaders:Reads[Col] = (
    (JsPath \ "cid").read[Int] and
      ((JsPath \ "vl").read[Int] orElse (JsPath \ "vl").read[String].map(e => Try{e.toInt}.recover{case _ => 0}.get))
    )(Col.apply _)
  implicit val RowReaders = Json.reads[Row]
  implicit val PuzzleReaders = Json.reads[Puzzle]
  implicit val SolutionReaders = Json.reads[Solution]
  def index = Action {
    Ok(views.html.index())
  }

  def solver = Action(BodyParsers.parse.json) { request =>
    val problem = request.body.validate[Puzzle]
    problem.fold(
      errors => {
        BadRequest(Json.obj("status" ->"KO", "message" -> JsError.toFlatJson(errors)))
      },
      pb => {
        val sudoku = Sudoku(pb)
        sudoku.solution() match {
          case Some(solution) =>
            val arr = Array.fill(9, 9)(0)
            for(ele <- solution){
              arr(ele.row)(ele.col) = ele.value
            }
            Ok(Json.toJson(Solution(true, Puzzle((0 until 9).map(r => Row(r, (0 until 9).map(c => Col(c, arr(r)(c))).toList)).toList))))
          case None =>
            Ok(Json.toJson(Solution(false, sudoku.puzzle)))
        }
      }
    )
  }

}