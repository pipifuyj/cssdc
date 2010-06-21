<?php
class defaultController extends Controller{
	public function Index(){
		$this->subtree=$this->framework->getModel("Subject")->store()->getTree();
		$this->equipDic=$this->framework->getModel("Equip")->store()->getDic();
		$this->areatree=$this->framework->getModel("Area")->store()->getTree();
		$this->elemDic=$this->framework->getModel("Elem")->store()->getDic();
		$this->satelliteDic=$this->framework->getModel("Satellite")->store()->getDic();
		$this->stationDic=$this->framework->getModel("Station")->store()->getDic();
	}
	public function Test(){
	}
}
?>
