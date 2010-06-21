<?php
class ResultsView extends View{
	function Index(){
		header('Content-type: text/xml');
		$xml="<?xml version='1.0'  encoding='UTF-8'?>\n";
		$xml.="<datasets>";
		foreach($this->records as $record){
			$xml.="<dataset>";
			$xml.="<id>".$record->id."</id>";
			$xml.="<addr>".$record->getDatasetURL()."</addr>";
			$xml.="<meta>".$record->getMetadataURL()."</meta>";
			$xml.="<doc>".$record->getDocURL()."</doc>";
			$xml.="<area>".$record->area."</area>";
			$xml.="<element>".$record->element."</element>";
			$xml.="<equip>".$record->equip."</equip>";
			$xml.="<platform>".$record->platform_id."</platform>";
			$xml.="<subject>".$record->subject."</subject>";
			$xml.="<files>";
			$start=$this->start;
			$limit=$this->limit;
			for($i=$start;$i<=$start+$limit;$i++){
				$Record=$record->MultiRecord[$i];
				$xml.="<file>";
				$xml.="<name>".$Record->filename."</name>";
				$xml.="<starttime>".$Record->starttime."</starttime>";
				$xml.="<endtime>".$Record->endtime."</endtime>";
				$xml.="<fileaddr>".$record->getDatasetURL().$Record->filepath."/".$Record->filename."</fileaddr>";
				$xml.="</file>";
			}
			$xml.="</files>";
			$xml.="</dataset>";
		}
		$xml.="</datasets>";	
		echo $xml;
	} 
}
?>
