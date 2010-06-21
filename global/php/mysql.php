<?php
require_once(dirname(__file__)."/abstract/sql.php");
class mysql extends sql{
	//begin of abstract methods
	function affectedRows(){
		return mysql_affected_rows($this->id);
	}
	function close(){
		return mysql_close($this->id);
	}
	function connect($server,$username,$password){
		return mysql_connect($server,$username,$password,true);
	}
	function escapeString($string){
		return mysql_real_escape_string($string,$this->id);
	}
	function execute($sql){
		return mysql_query($sql,$this->id);
	}
	function fetchField($result,$offset=null){
		if($offset===null)$return=mysql_fetch_field($result);
		else $return=mysql_fetch_field($result,$offset);
		//the if statement is necessary, because (array)false=array(false) is true , not false or null.
		//the function will return null if it fetches nothing from result.
		if($return)$return=(array)$return;
		return $return;
	}
	function fetchRow($result){
		return mysql_fetch_assoc($result);
	}
	function free($result){
		return mysql_free_result($result);
	}
	function fetchAllTableNames($database=null){
		if($database){
			$result=$this->executef("show tables in `%s`",array($database));
		}else{
			$result=$this->execute("show tables");
		}
		$field=$this->fetchField($result);
		$name=$field['name'];
		$names=array();
		while($row=$this->fetchRow($result)){
			$names[]=$row[$name];
		}
		return $names;
	}
	function fetchColumn($table,$column){
		$o=false;
		$result=$this->executef("show full columns from `%s` like '%s'",array($table,$column));
		//array(Field, Type, Collation, Null, Key, Default, Extra, Privileges, Comment)
		$row=$this->fetchRow($result);
		if($row){
			$o=array(
				"name"=>&$row['Field'],
				"key"=>&$row['Key'],
				"type"=>&$row['Type'],
				"default"=>&$row['Default'],
				"comment"=>&$row['Comment']
				);
		}
		return $o;
	}
	function fetchAllColumnNames($table){
		$names=array();
		$result=$this->executef("show columns from `%s`",array($table));
		while($row=$this->fetchRow($result))$names[]=$row['Field'];
		return $names;
	}
	function insertId(){
		return mysql_insert_id($this->id);
	}
	function numRows($result){
		return @mysql_num_rows($result);
	}
	function numFields($result){
		return @mysql_num_fields($result);
	}
	function setCharset($charset){
		return $this->execute("set names '".$this->escapeString($charset)."'");
	}
	function setDatabase($database){
		return mysql_select_db($database,$this->id);
	}	
	//end of abstract methods
	function getAllColumns($table){
		$columns=array();
		$result=$this->executef("show full columns from `%s`",array($table));
		while($row=$this->fetchRow($result)){
			$columns[$row['Field']]=array(
				"name"=>&$row['Field'],
				"key"=>&$row['Key'],
				"type"=>&$row['Type'],
				"default"=>&$row['Default'],
				"comment"=>&$row['Comment']
				);
		}
		return $columns;
	}
	//end of rewriting methods
}
?>
