<?php
class ModelRecord implements Iterator,ArrayAccess{
	public $model=null;
	public $id=null;
	public $data=array();
	private $_iterator=0;
	public function current(){
		return $this->get($this->key());
	}
	public function key(){
 		return $this->model->fields[$this->_iterator]->name;
	}
	public function next(){
		$this->_iterator++;
	}
	public function rewind(){
		$this->_iterator=0;
	}
	public function valid(){
		return isset($this->model->fields[$this->_iterator]);
	}
	public function offsetExists($offset){
		return $this->model->hasField($offset);
	}
	public function offsetGet($offset){
		return $this->get($offset);
	}
	public function offsetSet($offset,$value){
		return $this->set($offset,$value);
	}
	public function offsetUnset($offset){
		return $this->set($offset,null);
	}
	public function __get($name){
		return $this->get($name);
	}
	public function __set($name,$value){
		return $this->set($name,$value);
	}
	public function construct($data=array(),$id=null){
		$this->id=$id;
		$this->data=$data;
	}
	public function get($key){
		return $this->data[$key];
	}
	public function set($key,$value){
		$this->data[$key]=$value;
	}
	public function add(){
		return $this->model->store()->add($this);
	}
	public function commit(){
		return $this->model->store()->commit($this);
	}
	public function save(){
		if($this->id)return $this->commit();
		else return $this->add();
	}
	public function remove(){
		return $this->model->store()->remove($this);
	}
	public function isValid(){
		foreach($this->model->fields as $field){
			if(!$field->allowBlank&&!$this->get($field->name))return false;
		}
		return true;
	}
}
?>
