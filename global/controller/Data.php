<?php
class DataController extends Controller{
	public function Index(){
		$PuredataStore=$this->framework->getModel("Puredata")->store();
		$start=0;$limit=6;$sort="filename";$dir="ASC";$dataFilter=array();
		foreach($_REQUEST as $key=>$value){
			if($key=="start")$start=$value;
			if($key=="limit")$limit=$value;
			if($key=="sort")$sort=$value;
			if($key=="dir")$dir=$value;
			if($key=="starttime")$dataFilter[]=array("starttime",">=",$value);
			if($key=="endtime")$dataFilter[]=array("endtime","<=",$value);
			if($key=="dataset")$dataFilter[]=array("dataset_id","=",$value);
		}
		$PuredataStore->sortBy($sort,$dir);
		$this->records=$PuredataStore->filter($dataFilter,$start,$limit);
		$this->lastClause=$this->sql->lastClause;
		$this->count=$PuredataStore->getTotalCount($dataFilter);
	}
}
?>
