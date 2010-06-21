<?php
class Model{
	public $_record="ModelRecord";
	public $_store="ModelStore";
	public $framework=null;
	public $id="";
	public $path="";
	public $fields=array();
	function construct(){
		$this->Fields=array();
		foreach($this->fields as &$field){
			if(is_string($field))$field=new ModelField($field);
			elseif(is_array($field)){
				$name="Model{$field['type']}Field";
				$field=new $name($field);
			}
			$this->Fields[$field->name]=$field;
		}
		require_once("{$this->_record}.php");
		$path="{$this->path}/{$this->id}{$this->_record}.php";
		if(is_file($path)){
			require_once($path);
			$this->_record="{$this->id}{$this->_record}";
		}
		require_once("{$this->_store}.php");
		$path="{$this->path}/{$this->id}{$this->_store}.php";
		if(is_file($path)){
			require_once($path);
			$this->_store="{$this->id}{$this->_store}";
		}
	}
	public function hasField($name){
		return isset($this->Fields[$name]);
	}
	public function field($name){
		return $this->Fields[$name];
	}
	public function record($data=array(),$id=null){
		$name=$this->_record;
		$record=new $name();
		$record->model=&$this;
		$record->construct($data,$id);
		return $record;
	}
	public function store(){
		$name=$this->_store;
		$store=new $name();
		$store->model=&$this;
		$store->construct();
		return $store;
	}
}
?>
