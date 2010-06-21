<?php
class EventView extends View{
	public function Index(){
		require("Event.Index.php");
	}
	public function getEventtype(){
		header('Content-type: text/xml');
		$xml="<?xml version='1.0'  encoding='UTF-8'?>\n";
		$xml.="<types>";
		foreach($this->types as $type){
			$xml.="<type>";	
			$xml.="<value>".$type."</value>";
			$xml.="</type>";	
		}
		$xml.="</types>";	
		echo $xml;
	}
	public function getRegnum(){
		header('Content-type: text/xml');
		$xml="<?xml version='1.0'  encoding='UTF-8'?>\n";
		$xml.="<regnums>";
		foreach($this->regnums as $regnum){
			$xml.="<regnum>";	
			$xml.="<value>".$regnum."</value>";
			$xml.="</regnum>";	
		}
		$xml.="</regnums>";	
		echo $xml;
	}
	 public function getRegloc(){
                header('Content-type: text/xml');
                $xml="<?xml version='1.0'  encoding='UTF-8'?>\n";
                $xml.="<reglocs>";
                foreach($this->reglocs as $regloc){
                        $xml.="<regloc>";
                        $xml.="<value>".$regloc."</value>";
                        $xml.="</regloc>";
                }
                $xml.="</reglocs>";
                echo $xml;
        }
	public function Search(){
		header('Content-type: text/xml');
		$xml="<?xml version='1.0'  encoding='UTF-8'?>\n";
		$xml.="<events>";
		$xml.="<count>".$this->count."</count>";
		foreach($this->events as $record){
			$xml.="<event>";
			$xml.="<id>".$record->id."</id>";
			$xml.="<nasastarttime>".$record->nasastart."</nasastarttime>";
			$xml.="<nasamaxtime>".$record->nasamax."</nasamaxtime>";
			$xml.="<flux>".htmlspecialchars($record->flux)."</flux>";
			$xml.="<assocme>".htmlspecialchars($record->assocme)."</assocme>";
			$xml.="<importance>".htmlspecialchars($record->impt)."</importance>";
			$xml.="<regionloc>".htmlspecialchars($record->regloc)."</regionloc>";
			$xml.="<regionnum>".$record->regnum."</regionnum>";
			$xml.="<esastarttime>".$record->esastart."</esastarttime>";
			$xml.="<esaendtime>".$record->esaend."</esaendtime>";
			$xml.="<esaduration>".$record->esaduration."</esaduration>";
			$xml.="<historyimg>".$record->historyimg."</historyimg>";
			$xml.="<specimg>".$record->specimg."</specimg>";
			$xml.="<statimg>".$record->statimg."</statimg>";
			$xml.="<alias>".$record->alias."</alias>";
			$xml.="<remark>".$record->remark."</remark>";
			$xml.="</event>";
		}
		$xml.="</events>";	
		echo $xml;
	}
	public function Data(){
		header('Content-type: text/xml');
		$xml="<?xml version='1.0'  encoding='UTF-8'?>\n";
		$xml.="<files>";
		$xml.="<count>".$this->count."</count>";
		foreach($this->records as $record){
				$xml.="<file>";
				$xml.="<record_id>".$record->id."</record_id>";
				$xml.="<filename>".$record->filename."</filename>";
				$xml.="<starttime>".$record->starttime."</starttime>";
				$xml.="<endtime>".$record->endtime."</endtime>";
				$xml.="<path>".$record->filepath."/".$record->filename."</path>";
				$xml.="</file>";
		}
		$xml.="</files>";	
		echo $xml;
	}
}
?>
