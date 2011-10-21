<?php
class DatasetModelRecord extends ModelRecord{
	public function getDatasetURL(){
		return $this->protocol."://".$this->ip.$this->dspath;
	}
	public function getMetadataURL(){
		return $this->protocol."://".$this->ip.$this->dspath.$this->mtpath;
	}
	public function getDocURL(){
		return $this->protocol."://".$this->ip.$this->dspath.$this->docpath;
	}
}
?>
