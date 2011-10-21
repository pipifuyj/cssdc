<?php
class Controller{
	public $framework=null;
	public function index($request=null,$session=null){
		return true;
	}
	public function __call($method,$args){
		$this->index();
	}
	public function __get($name){
		return $this->framework->$name;
	}
}
?>