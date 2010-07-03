<?php
require("global/php/framework.php");
require("global/php/mysql.php");
$global=new framework("global","global");
$global->title="Space Science Data Grid";
$global->sql=new mysql("localhost","root","","cssdc","utf8");
$global->main();
?>
