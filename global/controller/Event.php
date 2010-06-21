<?php
class EventController extends Controller{
public function Index(){
	$this->store=$this->framework->getModel("Event")->store();
	$this->types=$this->store->filter();
	$ProtonStore=$this->framework->getModel("Proton")->store();
	$this->regnums=$ProtonStore->collect("regnum");
	$this->reglocs=$ProtonStore->collect("regloc");
}
public function getEventtype(){
	$store=$this->framework->getModel("Event")->store();
	$this->types=$store->collect('name');
}
public function getRegnum(){
	$store=$this->framework->getModel("Proton")->store();
	$this->regnums=$store->collect("regnum");
}
public function getRegloc(){
	$store=$this->framework->getModel("Proton")->store();
	$this->reglocs=$store->collect("regloc");
}
public function Search(){
	$eventType=ucfirst($_REQUEST["type"]);
	$start=0;$limit=10;
	if(isset($_REQUEST['start'])){
		$start=$_REQUEST["start"];
	}
	if(isset($_REQUEST['limit'])){
		$limit=$_REQUEST["limit"];
	}
	$EventStore=$this->framework->getModel($eventType)->store();
	if($_REQUEST["starttime"]) $EventStore->filterBy(array(array("nasastart",">=",$_REQUEST["starttime"])));
	if($_REQUEST["endtime"]) $EventStore->filterBy(array(array("esaend","<=",$_REQUEST["endtime"])));
	if($_REQUEST["maxtime"]) $EventStore->filterBy(array(array("nasamax","=",$_REQUEST["maxtime"])));
	if($_REQUEST["regnum"]) $EventStore->filterBy(array(array("regnum","=",$_REQUEST["regnum"])));
	if($_REQUEST["regloc"]) $EventStore->filterBy(array(array("regloc","=",$_REQUEST["regloc"])));
	if($_REQUEST["alias"]) $EventStore->filterBy(array(array("alias","=",$_REQUEST["alias"])));
	$filters=$EventStore->filters;
	$EventStore->filters=array();
	if(isset($_REQUEST['sort'])&&isset($_REQUEST['dir'])){
		$sort=$_REQUEST["sort"];
		$dir=$_REQUEST["dir"];
		$EventStore->sortBy($sort,$dir);
	}
   	$this->events=$EventStore->filter($filters,$start,$limit);
	$this->lastClause=$this->sql->lastClause;
	$this->count=$EventStore->getTotalCount($filters);
}
public function Data(){
	$sort="record_id";$dir="ASC";
	$eventType=$_REQUEST["type"];
	$eventid=$_REQUEST["event"];
	if(isset($_REQUEST["sort"])&&isset($_REQUEST['dir'])){
		$sort=$_REQUEST["sort"];
		$dir=$_REQUEST["dir"];
	}	
	$DataStore=$this->framework->getModel("Puredata")->store();
	$EventStore=$this->framework->getModel($eventType)->store();
	$RefStore=$this->framework->getModel($eventType."ref")->store();
	if(isset($_REQUEST["start"]))$start=$_REQUEST["start"];
	else $start=0;
	if(isset($_REQUEST["limit"]))$limit=$_REQUEST["limit"];
	else $limit=30;
	$currEvent=$EventStore->getById($eventid);
	$relations=$RefStore->filter(array(array("id","=",$eventid)));	
	foreach($relations as $index=>$relation){
		$currDsId=$relation->dataset;
		if($relation->reltype==="before"){
			$currEndTime=$currEvent->starttime;
			$currStartTime=date("Y-m-d H:i:s",strtotime($currEndTime)-$relation->timemap*3600*24);
			$array=array(
				array("dataset_id","=",$currDsId),
				array("starttime",">=",$currStartTime),
				array("endtime","<=",$currEndTime)
			);
			$DataStore->filterBy($array,$index==0?"and":"or");
		}else if($relation->reltype==="with"){
		}else if($relation->reltype==="after"){
			$currStartTime=$currEvent->endtime;
			$currEndTime=date("Y-m-d H:i:s",(strtotime($currEndTime)+$relation->timemap*3600*24));
			$array=array(
				array("dataset_id","=",$currDsId),
				array("starttime",">=",$currStartTime),
				array("endtime","<=",$currEndTime)
			);
			$DataStore->filterBy($array,$index==0?"and":"or");
		}
	}
	$filters=$DataStore->filters;
	$DataStore->filters=array();
	$DataStore->sortBy($sort,$dir);
	$this->records=$DataStore->filter($filters,$start,$limit);
	$this->sql=$this->sql->lastClause;
	$this->count=$DataStore->getTotalCount($filters);
}
}
?>
