<?php
class StationModelSQLStore extends ModelSQLStore{
	public $id="station_id";	
	public $table="obsv_platform_station_dic";
	public $fields=array("station_name","platform_shortname","group_owner","station_code","longitude","latitude","altitude","intro","pic");
	public function getDic(){
		return $this->where();
	}
	public function genXml(){
		$xml='<markers>';
		$dic=$this->getDic();
		foreach($dic as $station){ 
			if($station->id !== '0'){
				$xml.='<marker ';
				$xml.='shortname="' . $station->shortname . '" ';
			 	$xml.='name="' . $this->parseToXML($station->name) . '" ';
			  	$xml.='lat="' . $station->lat . '" ';
			  	$xml.='lng="' . $station->lng . '" ';
			  	$xml.='group="' .$this->parseToXML($station->group) . '" ';
			  	$xml.='pic="' . $this->parseToXML($station->pic) . '" ';
			  	$xml.='/>';	
			}
		}
		$xml.='</markers>';
		return $xml;	
	}
	private function parseToXML($htmlStr) { 
		$xmlStr=str_replace('<','&lt;',$htmlStr); 
		$xmlStr=str_replace('>','&gt;',$xmlStr); 
		$xmlStr=str_replace('"','&quot;',$xmlStr); 
		$xmlStr=str_replace("'",'&#39;',$xmlStr); 
		$xmlStr=str_replace("&",'&amp;',$xmlStr); 
		return $xmlStr; 
	} 
}
?>
