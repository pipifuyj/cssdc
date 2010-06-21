<?php
class GmapController extends Controller{
	public function Index(){
		$StationStore=$this->framework->getModel("Station")->store();
		$this->xml=$StationStore->genXml();
	}
}
?>
