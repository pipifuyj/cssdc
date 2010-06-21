<html>
<head>
   <title>Google Earth</title>
   <script src="http://www.google.com/jsapi?key=ABQIAAAA2hBy59OdKe0nHApjRsj0SRTaX_gdZYQO0dBoUqgngpfZrzSB3xT3BR0pJAaEZ_ZKFO7BlUUiGjNuMQ"> </script>
   <script type="text/javascript">
      var ge;
      google.load("earth", "1");

      function init() {
         google.earth.createInstance('map3d', initCB, failureCB);
      }

      function initCB(instance) {
         ge = instance;
         ge.getWindow().setVisibility(true);
      }

      function failureCB(errorCode) {
      }

      google.setOnLoadCallback(init);
   </script>

</head>
<body>
   <div id="map3d" style="height: 400px; width: 600px;"></div>
</body>
</html>
