<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 TransitioNAl//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title><?php echo $this->title;?></title>
		<script src="global/ext-3.2.1/adapter/ext/ext-base.js"></script>
		<script src="global/ext-3.2.1/ext-all.js"></script>
		<script src="http://www.google.com/jsapi?key=ABQIAAAA2hBy59OdKe0nHApjRsj0SRQZ1gBj0Uz7zCLWNIOHLzSuXaZBlxRwQOu3E8PccL--IbNFYppaY7o64Q"></script>
		<script src="global/javascript/Color.js"></script>
		<script src="global/view/Gearth.js"></script>
		<style>
@import url("global/ext-3.2.1/resources/css/ext-all.css");
@import url("global/view/Viewmore.css");
#form{
	float:left;
}
form{
	margin:20px;
	width:400px;
	text-align:left;
}
fieldset{
	margin:10px 0px;
	padding:5px;
}
label{
	float:left;
	width:150px;
}
#map3d{
	float:left;
	margin:20px;
	height:300px;
	width:400px;
}
#colors{
	float:left;
	border:1px;
	margin:5px;
	height:400px;
	width:5px;
}
		</style>
	</head>
	<body><div id="body">
		<?php require("Header.php");?>
		<div id="main">
		<!--write down your content here-->
		<p><strong><font color="#FF0000">NRLMSISE-00 Model 2001 </font></strong></p>
		<p><strong><font color="#0066FF">Instant Run</font></strong></p>
<div id="form"><form id="params" action="#" method="post">
<fieldset>
	<legend>Select  Date (1961/03/01 - 2009/12/31) and Time:</legend>
	<label>Year(eg:2000)</label><input type="text" class="input" name="year"> 
	<br>
	<label>Month(eg:01)</label><input type="text" class="input" name="month">
	<br>
	<label>Day(eg:01)</label><input type="text" class="input" name="day">
	<br>
	<label>Time Type</label>
	<select name="timetype">
		<option value="Universal">Universal</option>
		<option value="Local">Local</option>
	</select>
</fieldset>
<fieldset>
	<legend>Select  Coordinates:</legend>
	<label>Coordinate Type</label>
	<select name="coordinate">
		<option value="Geographic">Geographic</option>
		<option value="Geomagnetic">Geomagnetic</option>
	</select>
</fieldset>
<fieldset>
	<legend>Parameters</legend>
	<label>Height (m)</label><input type="text" class="input" name="height">
</fieldset>
<fieldset>
	<legend>SelectCalculated  MSIS Model Parameters:</legend>
	<label>Data Type</label>
	<select name="data">
		<option value="O">Atomic Oxygen (O), cm-3</option>
		<option value="N2">Nitrogen (N2), cm-3</option>
		<option value="O2">Oxygen O2, cm-3</option>
		<option value="TMD">Total Mass Density, g/cm-3</option>
		<option value="NT">Neutral Temperature, K</option>
		<option value="ET">Exospheric Temperature, K</option>
		<option value="HE">Helium (He), cm-3</option>
		<option value="AR">Argon (Ar), cm-3</option>
		<option value="H">Hydrogen (H), cm-3</option>
		<option value="N">Nitrogen (N), cm-3</option>
	</select>
</fieldset>
<input id="submit" type="submit" value="Submit" class="button"/>
<input id="submit2" type="submit" value="Clear" class="button"/>
</form></div>
<div id="map3d"></div>
<div id="colors"></div>
<br clear="both" />
		<p><strong><font color="#0066FF">About NRLMSISE-00 Model  2001</font></strong></p>
		<p>The atmosphere can roughly be characterized as the region from sea level to  about 1000 km altitude around the globe, where neutral gases can be detected.  Below 50 km the atmosphere can be assumed to be homogeneously mixed and can be  treated as a perfect gas. Above 80 km the hydrostatic equilibrium gradually  breaks down as diffusion and vertical transport become important. The major  species in the upper atmosphere are N2, O, O2, H, He. Temperature-oriented  nomenclature differentiates the strata of the atmosphere as follows: the  troposphere, from sea level up to about 10 km, where the temperature decreases;  the stratosphere, from 10 km up to about 45 km, where the temperature  increases; the mesosphere, from 45 km up to about 95 km, where the temperature  decreases again; the thermosphere, from 95 km to about 400 km, where the  temperature increases again; and the exosphere, above about 400 km, where the  temperature is constant. <br />
	    The NRLMSIS-00 empirical  atmosphere model was developed by Mike Picone, Alan Hedin, and Doug Drob based  on the MSISE90 model. The main differences to MSISE90 are noted in the comments  at the top of the computer code. They involve<br />
	    (1) the extensive use of drag and accelerometer data on total mass density, <br />
	    (2) the addition of a component to the total mass density that accounts for  possibly significant contributions of O+ and hot oxygen at altitudes above 500  km, <br />
	    (3) the inclusion of the SMM UV occultation data on [O2].<br />
	    The <a href="http://ccmc.gsfc.nasa.gov/modelweb/atmos/msise.html">MSISE90</a> model describes the neutral temperature and densities in Earth's atmosphere  from ground to thermospheric heights. Below 72.5 km the model is primarily  based on the MAP Handbook (Labitzke et al., 1985) tabulation of zonal average  temperature and pressure by Barnett and Corney, which was also used for the <a href="http://ccmc.gsfc.nasa.gov/modelweb/atmos/cospar1.html">CIRA-86</a>. Below  20 km these data were supplemented with averages from the National Meteorological  Center (NMC). In addition, pitot tube, falling sphere, and grenade sounder  rocket measurements from 1947 to 1972 were taken into consideration. Above 72.5  km MSISE-90 is essentially a revised <a href="http://ccmc.gsfc.nasa.gov/modelweb/atmos/msis.html">MSIS-86</a> model  taking into account data derived from space shuttle flights and newer  incoherent scatter results.</p>
		<span>
			<strong>Model Author: </strong>
			<br />
			M. Picone, A.E. Hedin, D. Drob
			<br />
			Naval Research Laboratory
			<br />
			<a href="mailto:picone@uap2.nrl.navy.mil">picone@uap2.nrl.navy.mil</a>
		</span>
		<!--stop writing-->
		</div>
		<div id="Footer"><img src="images/Footer.jpg" /></div>
</div></body>
</html>
