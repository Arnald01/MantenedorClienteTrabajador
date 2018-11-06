<?php
   header("Access-Control-Allow-Origin: *");
   header('Content-Type: application/json');
   require_once "db.php";


  $sql = "SELECT t.nombre , t.apellido , t.sexo ,t.fono, t.cod_cliente , c.correo , c.contrasena , c.tipo_cuenta ,c.fecha_creacion FROM CLIENTE t , CUENTA c WHERE  c.correo = t.correo AND (c.tipo_cuenta='C')";

   $resultado = select($sql);
   echo json_encode($resultado);
 ?>


