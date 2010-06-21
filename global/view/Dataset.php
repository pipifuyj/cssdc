<?php
class DatasetView extends View{
	function Index(){
		header('Content-type: text/xml');
		$xml="<?xml version='1.0'  encoding='UTF-8'?>\n";
		$xml.="<datasets>";
		$xml.="<sql>".htmlspecialchars($this->sql)."</sql>";
		$xml.="<count>".$this->count."</count>";
		foreach($this->records as $record){
			$xml.="<dataset>";
			$xml.="<id>".$record->id."</id>";
			$xml.="<dsname>".htmlspecialchars($record->dsname)."</dsname>";
			$xml.="<addr>".$record->getDatasetURL()."</addr>";
			$xml.="<meta>".$record->getMetadataURL()."</meta>";
			$xml.="<doc>".$record->getDocURL()."</doc>";
			$xml.="<format>".$record->format."</format>";
			$xml.="<area>";
			foreach($record->MultiArea as $Area) $xml.="[".$this->areastore->getPath($Area->area)."]";
			$xml.="</area>";
			$xml.="<element>";
			foreach($record->MultiElem as $Elem) $xml.="[".$Elem->element."]";
			$xml.="</element>";	
			$xml.="<equip>".$record->equip."</equip>";
			$xml.="<platform>".$record->platform_id."</platform>";
			$xml.="<subject>".$record->subject."</subject>";
			$xml.="<institution>";
			foreach($record->MultiNode as $Node) $xml.=$Node->institution." ";
			$xml.="</institution>";
			$xml.="</dataset>";
		}
		$xml.="</datasets>";	
		echo $xml;
	} 
}
?>
