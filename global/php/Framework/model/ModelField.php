<?php
class ModelField{
	public $model=null;
	public $allowBlank=true;
	public $defaultValue="";
	public $mapping="";
	public $name="";
	public $sortDir="ASC";
	public function ModelField($config=array()){
		if(!is_array($config))$config=array("name"=>$config);
		foreach($config as $name=>$value)$this->$name=$value;
		if(!$this->mapping)$this->mapping=$this->name;
	}
	public function convert($value,$data){
		return $value;
	}
}
class ModelBoolField extends ModelField{
	public $defaultValue=false;
	public function convert($value,$data){
		if(preg_match("/^0|no|false$/i",$value))return false;
		elseif($value)return true;
		else return false;
	}
}
class ModelDateField extends ModelField{
	public $dateFormat="Y-H-i";
	public function convert($value,$data){
		return date($this->dateFormat,strtotime($value));
	}
}
?>