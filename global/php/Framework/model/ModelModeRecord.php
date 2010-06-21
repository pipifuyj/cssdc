<?php
require_once("ModelRecord.php");
class ModelModeRecord extends ModelRecord{
	public $owner="user";
	public $group="user";
	public $mode="rwxrwxrwx";
	public $user="user";
	public $groups=array("user");
	public function construct($data=array(),$id=null){
		parent::construct($data,$id);
		$this->owner=$this->getOwner();
		$this->group=$this->getGroup();
		$this->mode=$this->getMode();
		$this->user=$this->getUser();
		$this->groups=$this->getGroups();
	}
	/**
	* @abstract
	*/
	public function getOwner(){
		return parent::get('owner');
	}
	/**
	* @abstract
	*/
	public function getGroup(){
		return parent::get('group');
	}
	/**
	* @abstract
	*/
	public function getMode(){
		return parent::get('mode');
	}
	/**
	* @abstract
	*/
	public function getUser(){
		return $this->model->framework->session->user;
	}
	/**
	* @abstract
	*/
	public function getGroups(){
		return explode(",",$this->model->framework->session->groups);
	}
	public function readable(){
		if($this->user==$this->owner&&$this->mode[0]=="r")return true;
		elseif(in_array($this->group,$this->groups)&&$this->mode[3]=="r")return true;
		elseif($this->mode[6]=="r")return true;
		else return false;
	}
	public function writable(){
		if($this->user==$this->owner&&$this->mode[1]=="r")return true;
		elseif(in_array($this->group,$this->groups)&&$this->mode[4]=="r")return true;
		elseif($this->mode[7]=="r")return true;
		else return false;
	}
	public function executable(){
		if($this->user==$this->owner&&$this->mode[2]=="r")return true;
		elseif(in_array($this->group,$this->groups)&&$this->mode[5]=="r")return true;
		elseif($this->mode[8]=="r")return true;
		else return false;
	}
	public function get($key){
		if($this->readable())return parent::get($key);
		else return null;
	}
	public function commit(){
		if($this->writable())return parent::commit();
		else return false;
	}
}
?>
