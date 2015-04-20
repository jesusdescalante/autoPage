$( document ).ready(function() {	
   
   var cant_agua=0;
   var cant_arcilla=0;
   var cant_bloques=0;

   var cant_cargada=0;
   var cant_pulverizada=0;
   var cant_agregada=0;
   var cant_mezclada=0;
   var cant_moldeada=0;
   var cant_cortada=0;
   var cant_secada=0;
   var producidos=0;
   
   var sobrante;
   var maquinaria=false;
//----------Opciones--------------//
   $("#botonmio").click(function(){

   	if( $(this).hasClass("btn waves-effect waves-light  orange darken-4") ){
        $(this).attr({'class': 'waves-effect waves-light btn  amber black segundo'});
        $(this).html('Detener<i class="mdi-content-send right"></i>');
        $maquinaria=true;
    }
    else{
        	$(this).attr({'class': 'btn waves-effect waves-light  orange darken-4'});
        	$(this).html('Iniciar<i class="mdi-content-send right"></i>');
          $maquinaria=false;
    }

    cant_arcilla=$('input:text[name=cant_arcilla]').val();
    cant_agua=$('input:text[name=cant_agua]').val();
    
    if(cant_agua*2<cant_arcilla/2){
          cant_bloques=cant_agua*2;
          sobrante=cant_arcilla-cant_bloques*2;
          $('input:text[name=cant_agua]').val("0");
          $('input:text[name=cant_arcilla]').val(sobrante);
    }
    else{
          cant_bloques=cant_arcilla/2;
          sobrante=cant_agua-cant_bloques/2;
          $('input:text[name=cant_arcilla]').val("0");
          $('input:text[name=cant_agua]').val(sobrante);
    }

    $('input:text[name=cant_bloques]').val("Se van a Producir: "+cant_bloques);
    $("#Agua").html("Agua: "+cant_agua);
    $("#Arcilla").html("Arcilla: "+cant_arcilla);
    if ($maquinaria) {
        var respuesta = reloj();
    };
   });

//----------Encendido de los LED--------------//
var i=0;
    function reloj(){
      if($maquinaria && cant_agua>0 && cant_arcilla>0){
        switch(i){
              case 0:
                  $("#1").attr({'class': 'btn btn-tiny fases orange accent-3'});
                  cant_arcilla--;
                  cant_cargada++;
                  $("#Arcilla").html("Arcilla: "+cant_arcilla);
                  $("#Cargado").html("Cargado: "+cant_cargada);
                  break;
              case 5:
                  $("#1").attr({'class': 'btn btn-tiny fases indigo accent-3'});
                  $("#2").attr({'class': 'btn btn-tiny fases orange accent-3'});
                  cant_cargada--;
                  cant_pulverizada++;
                  $("#Pulverizado").html("Pulverizado: "+cant_pulverizada);
                  $("#Cargado").html("Cargado: "+cant_cargada);
                  break;             
              case 10:
                  $("#2").attr({'class': 'btn btn-tiny fases indigo accent-3'});
                  if(cant_pulverizada>1){
                      $("#3").attr({'class': 'btn btn-tiny fases orange accent-3'});
                      cant_pulverizada-=2;
                      cant_agregada++;
                      cant_agua-=0.5;
                      $("#Pulverizado").html("Pulverizado: "+cant_pulverizada);
                      $("#Agregado").html("Agregado: "+cant_agregada);
                      $("#Agua").html("Agua: "+cant_agua);  
                  }
                  else{
                      i=-1;
                  }
                  break;
              case 15:
                  $("#3").attr({'class': 'btn btn-tiny fases indigo accent-3'});
                  $("#4").attr({'class': 'btn btn-tiny fases orange accent-3'});
                  cant_agregada--;
                  cant_mezclada++;
                  $("#Agregado").html("Agregado: "+cant_agregada);
                  $("#Mezclado").html("Mezclado: "+cant_mezclada);
                  break;
              case 20:
                  $("#4").attr({'class': 'btn btn-tiny fases indigo accent-3'});
                  $("#5").attr({'class': 'btn btn-tiny fases orange accent-3'});
                  cant_mezclada--;
                  cant_moldeada++;
                  $("#Moldeado").html("Moldeado: "+cant_moldeada);
                  $("#Mezclado").html("Mezclado: "+cant_mezclada);
                  break;
              case 25:
                  $("#5").attr({'class': 'btn btn-tiny fases indigo accent-3'});
                  $("#6").attr({'class': 'btn btn-tiny fases orange accent-3'});
                  cant_moldeada--;
                  cant_cortada++;
                  $("#Moldeado").html("Moldeado: "+cant_moldeada);
                  $("#Cortado").html("Cortado: "+cant_cortada);
                  break;
              case 30:
                  $("#6").attr({'class': 'btn btn-tiny fases indigo accent-3'});
                  if(cant_cortada>9){
                      $("#7").attr({'class': 'btn btn-tiny fases orange accent-3'});
                      cant_cortada-=10;
                      cant_secada+=10;
                      $("#Secado").html("Secado: "+cant_secada);
                      $("#Cortado").html("Cortado: "+cant_cortada);
                  }
                  else{
                      i=-1;
                  }
                  break;
              case 35:
                  $("#7").attr({'class': 'btn btn-tiny fases indigo accent-3'});
                  $("#8").attr({'class': 'btn btn-tiny fases orange accent-3'});
                  cant_secada-=10;
                  $("#Secado").html("Secado: "+cant_secada);
                  break;
              case 40:
                  $("#8").attr({'class': 'btn btn-tiny fases indigo accent-3'});
                  i=-1;
                  producidos+=10;
                  $("#Procesados").html("Procesados: "+producidos);
                  break;
        }
        i++;
      }
      else{
        if(!$maquinaria && i<40)
          alert("Se finalizo el proceso.\n Se produjeron: "+producidos+" bloques.");
      }
        setTimeout(function(){
            reloj();
        }, 100);
    }   
});