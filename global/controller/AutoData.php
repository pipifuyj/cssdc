<?php
class AutoDataController extends Controller{
	public function Index(){
		$start=0;$limit=6;$sort="filename";$dir="ASC";$dataFilter=array();
		foreach($_REQUEST as $key=>$value){
			if($key=="start")$start=$value;
			if($key=="limit")$limit=$value;
			if($key=="sort")$sort=$value;
			if($key=="dir")$dir=$value;
			if($key=="starttime")$dataFilter[]=array("starttime",">=",$value);
			if($key=="endtime")$dataFilter[]=array("endtime","<=",$value);
		}
		$Store=$this->framework->getModel("Autodata")->store();
		$Store->sortBy($sort,$dir);
		$this->datasetid=$_REQUEST['dataset'];
		$this->records=$Store->filter($dataFilter,$start,$limit);
		$this->lastClause=$this->sql->lastClause;
		$this->count=$Store->getTotalCount($dataFilter);
	}
}
?>
