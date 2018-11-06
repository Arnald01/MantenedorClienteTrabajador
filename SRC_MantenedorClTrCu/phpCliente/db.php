<?php
   function conectar(){
         $link = mysqli_connect("localhost","root","","RETRO_BELLEZA");
         return $link;
   }

   function query($sql){
      $link = conectar();
      mysqli_query($link, $sql);
      $rowsafected = mysqli_affected_rows($link);
      
  	    if($rowsafected <= 0){
       		 $res->mensaje = "Error de consulta, descripcion: " . mysqli_error($link);
            	 return $res; 
      	    }else{
        	 $res->mensaje = "exitoso!";
        	 return $res;  
      	    }  
   }

   function select($sql){
     $link = conectar();
     $query = mysqli_query($link, $sql);;
     $res = array();
     while($rs = mysqli_fetch_assoc($query)){
       $res[] = $rs;
     }
     return $res;
   }

 ?>
