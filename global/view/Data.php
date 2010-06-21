<?php
class DataView extends View{
	function Index(){
		header('Content-type: text/xml');
		$xml="<?xml version='1.0'  encoding='UTF-8'?>\n";
		$xml.="<files>";
		$xml.="<sql>".htmlspecialchars($this->lastClause)."</sql>";
		$xml.="<count>".$this->count."</count>";
		foreach($this->records as $record){
			$xml.="<file>";
			$xml.="<id>".$record->id."</id>";
			$xml.="<path>{$record->filepath}</path>";
			$xml.="<name>".$record->filename."</name>";
			$xml.="<thumb>{$record->thumb}</thumb>";
			$xml.="<size>".$record->filesize."</size>";
			$xml.="<starttime>".$record->starttime."</starttime>";
			$xml.="<endtime>".$record->endtime."</endtime>";
			$xml.="</file>";
		}
		$xml.="</files>";	
		echo $xml;
	} 
}
?>
