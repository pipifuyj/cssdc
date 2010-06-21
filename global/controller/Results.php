<?php
class ResultsController extends Controller{
	public function Index(){
		$Model = $this->framework->getModel("Dataset");
		$Store = $Model->store();
		$this->start=0;
		$this->limit=6;
		$filters=array();
		foreach($_GET as $key=>$value){
			if($key=="keywords"){
				foreach($value as $keyword){
					$Store->filterBy(array(array("dsname","like","%%".$keyword."%%")));
					$Store->filterBy(array(array("area","like","%%".$keyword."%%")),"or");
					$Store->filterBy(array(array("element","like","%%".$keyword."%%")),"or");
					$Store->filterBy(array(array("equip","like","%%".$keyword."%%")),"or");
					$Store->filterBy(array(array("satellite","like","%%".$keyword."%%")),"or");
					$Store->filterBy(array(array("station","like","%%".$keyword."%%")),"or");
					$Store->filterBy(array(array("subject","like","%%".$keyword."%%")),"or");
					$filters[]=$Store->filters;
					$Store->filters=array();
				}
			}
			if($key=="DateFrom"){
				$filters[]=array("starttime",">=",$value);
			}
			if($key=="DateTo"){
				$filters[]=array("endtime","<=",$value);
			}
			if($key=="equip"){
				$filters[]=array("equip","=",$value);
			}
			if($key=="area"){
				$filters[]=array("area","=",$value);
			}
			if($key=="element"){
				$filters[]=array("element","=",$value);
			}
			if($key=="satellite"){
				$filters[]=array("satellite","=",$value);
			}
			if($key=="station"){
				$filters[]=array("station","=",$value);
			}
			if($key=="start"){
				$this->start=(int)$value;
			}
			if($key=="limit"){
				$this->limit=(int)$value;
			}
		}
		$this->records=$Store->filter($filters,$this->start,$this->limit);
	}
}
?>
