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
	$eventType=ucwords($_REQUEST["type"]);
	$eventid=(int)$_REQUEST["event"];
	if(isset($_REQUEST["sort"])&&isset($_REQUEST['dir'])){
		$sort=$_REQUEST["sort"];
		$dir=$_REQUEST["dir"];
	}	
	if(isset($_REQUEST["start"]))$begin=$_REQUEST["start"];
	else $begin=0;
	if(isset($_REQUEST["limit"]))$limit=$_REQUEST["limit"];
	else $limit=30;

	$DataStore=$this->framework->getModel("Puredata")->store();
	$EventStore=$this->framework->getModel($eventType)->store();
	$RefStore=$this->framework->getModel($eventType."ref")->store();

	$currEvent=$EventStore->filter(array(array("id","=",$eventid)));
	$currEvent=$currEvent[0];
	$relations=$RefStore->filter();	

	foreach($relations as $index=>$relation){
		$currDsId=$relation->dataset;
		if($relation->reltype==="before"){
			$start=date("Y-m-d H:i:s",strtotime($currEvent->nasastart)-$relation->starttimemap*60);
			$end=date("Y-m-d H:i:s",strtotime($start)+$relation->timemap*60);
			$array=array(
				array("dataset_id","=",$currDsId),
				array("starttime","<=",$start),
				array("endtime",">=",$end)
			);
			$DataStore->filterBy($array,$index==0?"and":"or");
			$array=array(
				array("dataset_id","=",$currDsId),
				array("starttime",">=",$start),
				array("endtime","<=",$end)
			);
			$DataStore->filterBy($array,"or");
		}else if($relation->reltype==="with"){
			$start=date("Y-m-d H:i:s",strtotime($currEvent->nasastart));
			$end=date("Y-m-d H:i:s",strtotime($start)+$relation->timemap*60);
			$array=array(
				array("dataset_id","=",$currDsId),
				array("starttime","<=",$start),
				array("endtime",">=",$end)
			);
			$DataStore->filterBy($array,$index==0?"and":"or");
			$array=array(
				array("dataset_id","=",$currDsId),
				array("starttime",">=",$start),
				array("endtime","<=",$end)
			);
			$DataStore->filterBy($array,"or");
		}else if($relation->reltype==="after"){
			$start=date("Y-m-d H:i:s",strtotime($currEvent->nasastart)+$relation->starttimemap*60);
			$end=date("Y-m-d H:i:s",strtotime($start)+$relation->timemap*60);
			$array=array(
				array("dataset_id","=",$currDsId),
				array("starttime","<=",$start),
				array("endtime",">=",$end)
			);
			$DataStore->filterBy($array,$index==0?"and":"or");
			$array=array(
				array("dataset_id","=",$currDsId),
				array("starttime",">=",$start),
				array("endtime","<=",$end)
			);
			$DataStore->filterBy($array,"or");
		}
	}
	$filters=$DataStore->filters;
	$DataStore->filters=array();
	$DataStore->sortBy($sort,$dir);
	$this->records=$DataStore->filter($filters,$begin,$limit);
	$this->sql=$this->sql->lastClause;
	$this->count=$DataStore->getTotalCount($filters);
}
}
?>
