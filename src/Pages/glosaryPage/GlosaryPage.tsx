import React, { useState } from "react";


//Definiendo la estructura del Grafo
type GlosaryEntry = { word: string; meaning: string };
type Graph = Map<string, {data: GlosaryEntry; neighbors: string[]}>
//Constructor para inicializar el Grafo 
function buildGraph(glosaryData: GlosaryData) : Graph{
    const graph: Graph = new Map();

    for( const [letter, entries] of Object.entries(glosaryData)){
        for( const entry of entries){
            graph.set(entry.word,{
                data: entry, 
                neighbors: []
            })
        }
    }

    return graph;
}

function connectNodes(graph: Graph) : void{
    for(const [word1, {data: data1}] of graph.entries()){
        for(const [word2, {data: data2}] of graph.entries()){
            if(word1 !== word2 && data1.meaning.includes(word2)){
                graph.get(word1)!.neighbors.push(word2)
            }
        }
    }
}




//Definiendo el contenido del Grafo
type GlosaryData = {
    [key: string]: GlosaryEntry[]; 
};
const glosaryData: GlosaryData = {
    A: [
        { word: "Activo", meaning: "Recurso con valor económico que posee una persona o empresa." },
        { word: "Activo fijo", meaning: "También denominado inmovilizado. Está integrado por los bienes y derechos de una empresa que no están destinados a la venta, sino a asegurar su funcionamiento y continuidad. Este tipo de activo se caracteriza por su permanencia en la empresa durante un periodo largo, normalmente superior a doce meses. Estos activos se amortizan durante toda la vida del bien." },
        { word: "Activo financiero", meaning: "Valor que acredita la titularidad de determinados derechos económicos (acciones, dinero en efectivo, depósitos, valores de renta fija...)." },
        { word: "Activo sin riesgo", meaning: "Activo financiero con un rendimiento conocido y cierto, emitido por una entidad u organismo sobre cuya capacidad para cumplir con sus obligaciones de pago no existen dudas. Tradicionalmente, el activo sin riesgo se asocia a la deuda pública a corto plazo emitida por los países desarrollados (por ejemplo, una Letra del Tesoro)." },
        { word: "Ahorro", meaning: "Dinero reservado para uso futuro." } 
    ],
    B: [
        { word: "BAI (beneficio antes de impuestos)", meaning: "Resultado obtenido por una compañía después de restar a los ingresos todos los gastos en que se ha incurrido, con excepción del impuesto de sociedades y otros tributos aplicables." },

        { word: "Bajista", meaning: "En el ámbito de los mercados financieros, este término indica que existen expectativas de caída en los precios o cotizaciones." },

        { word: "BAI (beneficio antes de impuestos)", meaning: "Resultado obtenido por una compañía después de restar a los ingresos todos los gastos en que se ha incurrido, con excepción del impuesto de sociedades y otros tributos aplicables." },

        { word: "Bajo la par", meaning: "Un título se emite o negocia bajo la par cuando el precio efectivo es inferior a su valor nominal. Ver VALOR NOMINAL." },

        { word: "BAI (beneficio antes de impuestos)", meaning: "Resultado obtenido por una compañía después de restar a los ingresos todos los gastos en que se ha incurrido, con excepción del impuesto de sociedades y otros tributos aplicables." },

        { word: "Balance", meaning: "Documento contable que indica la situación económica y financiera de una sociedad a una fecha determinada. Está compuesto por dos partes que han de tener idéntico valor: el activo (conjunto de bienes y derechos) y el pasivo (recursos propios y ajenos con los que se financia el activo). Ver ACTIVO y PASIVO." },

        { word: "Banca personal", meaning: "Actividad bancaria especializada en la gestión de las inversiones y del patrimonio de clientes generalmente de elevado nivel económico." },

        { word: "Banco Central", meaning: "Institución que tiene como misión la definición y ejecución de la política monetaria dentro de un área determinada, incluyendo la emisión de su moneda de curso legal. Esta misión normalmente va asociada al objetivo de mantener la estabilidad de los precios. Los bancos centrales, dependiendo de las competencias que les hayan sido asignadas, pueden ejercer también otras funciones, como la supervisión de los sistemas de pagos, la supervisión de las entidades de crédito, servir de agente financiero del Estado, etc." },

        { word: "Banco Central Europeo", meaning: "Órgano responsable de la política monetaria de los países de la zona euro. Fue creado en 1988 y su principal cometido es garantizar la estabilidad de precios, al tiempo que apoya las políticas económicas generales de la Unión Europea con el fin de contribuir a los objetivos comunitarios. El BCE debe actuar con independencia respecto a los gobiernos nacionales y a las demás instituciones u organismos comunitarios. Su sede está en la ciudad alemana de Frankfurt." },

        { word: "Banco comercial", meaning: "Denominación que agrupa a los bancos tradicionales, dedicados a captar depósitos de los ahorradores, a la concesión de créditos a los particulares y a gestionar el tráfico de pagos y cobros de las economías domésticas." },
    ],
    C: [
        { word: "Cadena de bloques (blockchain)", meaning: "Registro basado en tecnologías de registro distribuido (TRD) en el que los datos se almacenan en bloques encadenados mediante criptografía." },
        { word: "Cadena Lateral (sidechain)", meaning: "Las soluciones de sidechain, como Polygon, crean una red secundaria que se ejecuta en paralelo con la red Ethereum y realiza transacciones fuera de la cadena principal. " },
        { word: "Cálculo de días", meaning: "Convenciones establecidas y aceptadas por los mercados para el cálculo de intereses y rentabilidades en valores de renta fija. Existen diferentes convenciones para el pago del interés. Algunas tienen en cuenta los días naturales hasta el pago del cupón; otras, los días hábiles. En función de la convención adoptada, el cálculo de interés puede ser muy diferente. Ver BASE DEL BONO." },
        { word: "Calentamiento del mercado", meaning: "Incremento del precio de un valor, provocado de forma artificial por alguien que tiene interés en una revalorización rápida. El calentamiento puede realizarse por medio de compras selectivas y difundiendo falsos rumores que disparen los precios." },
        { word: "Capital", meaning: "Dinero o bienes que se usan para generar ingresos." },
        { word: "Crédito", meaning: "Acuerdo donde un prestamista da dinero a un prestatario a cambio de devolución futura." },
        
    ],
    D: [
        { word: "DApp", meaning: "Tipo de aplicación cuyo funcionamiento no depende de puntos de control o servi-dores centrales, sino que funciona en base a una red descentralizada." },
        {word:"Deducción fiscal", meaning:"Cantidad que se puede rebajar de la cuota tributaria. En el mundo financiero, ventaja que está presente en productos como los planes de pensiones o las cuentas de ahorro vivienda."},
        {word:"Defensor del cliente", meaning:"Figura nombrada por una o varias entidades financieras agrupadas, cuya función consiste en atender las quejas de los clientes, asesorarles sobre el alcance de sus derechos y promover el cumplimiento de la normativa y de las buenas prácticas financieras. No es obligatorio para las entidades disponer de esta figura (sí lo es el Servicio de Atención al Cliente), pero en caso de que se designe, sus resoluciones favorables a los clientes son vinculantes para la entidad reclamada."},
        {word:"DeFi", meaning:"Acrónimo de Decentralized Finance o Finanzas Descentralizadas, se refiere a la crea-ción y uso de aplicaciones descentralizadas, que se ejecutan en una red blockchain y que, a priori, no requieren intermediarios."},
        {word:"Delegación de voto", meaning:"Procedimiento por el que un accionista que no pueda asistir personalmente a una Junta General de Accionistas o no posea el número mínimo de acciones requerido designa a otros accionistas, terceras personas, consejeros o al presidente del Consejo de Administración para que le represente y ejerza en su lugar el derecho al voto."},
        {word:"Dependencia", meaning:"Situación en la que se encuentra una persona que, por razones ligadas a la falta o a la pérdida de autonomía física, psíquica o intelectual, necesita la asistencia y/o ayudas importantes a fin de realizar los actos corrientes de la vida diaria. En general, situación en la que se necesita la asistencia de otras personas, para los actos esenciales de la vida y de comunicación con los demás."},
        {word:"Depósito", meaning:"1) Cantidad de dinero ingresada en las entidades de crédito para su custodia. En los depósitos de dinero la entidad se obliga a devolver la misma cantidad más un interés. 2) Valores que un inversor deja en custodia a una entidad, que está obligada a cuidar del cobro de los derechos económicos y comunicar al depositante todas las circunstancias que pueda afectar al valor (ampliaciones de capital, OPAs, «splits», exclusiones de cotización, canjes, etc.). Ver CUSTODIA DE VALORES y DEPÓSITO DE VALORES."},
        {word:"Depósito a la vista", meaning:"Cuenta en la que las cantidades depositadas pueden retirarse en cualquier momento y sin previo aviso."},
        {word:"Depósito a plazo", meaning:"Cantidad de dinero depositada en una entidad que genera unos intereses para el ahorrador, pero siempre que éste no retire el dinero antes de la fecha a la que se ha comprometido; en caso contrario, se le puede penalizar."}
    ],
    E: [
        { word: "Economía real", meaning: "Conjunto de actividades productivas de un país." },
        { word: "Efectos comerciales", meaning: "Títulos de crédito que pueden cobrarse (si son a favor) o deben ser pagados (si son a cargo) al llegar su fecha de vencimiento. Pueden ser letras de cambio, pagarés, etc." },
        { word: "Ejecución", meaning: "Término con el que se hace referencia al cumplimiento de una orden bursátil de compra o venta. El término “best-execution” hace referencia a la obligación, por parte de la agencia o sociedad de valores, de realizar la orden dada por su cliente al mejor precio posible en ese momento." },
        { word: "Embargo", meaning: "Retención, inmovilización o secuestro de bienes por mandamiento del juez o autoridad competente." },
        { word: "Emisión", meaning: "RA efectos de lo previsto en la normativa española, se entiende por emisión cada conjunto de valores negociables que proceden de un mismo emisor y que se pueden considerar homogéneos entre sí (atribuyen a sus titulares un contenido similar de derechos y obligaciones, tienen la misma naturaleza y régimen de transmisión, y responden a una unidad de propósito, como por ejemplo la obtención sistemática de financiación). Existen emisiones de acciones, de obligaciones, de obligaciones convertibles, de acciones preferentes, de obligaciones perpetuas, etc." },
    ],
    F: [
        { word: "Factores de sostenibilidad", meaning: "Toda información relacionada con cuestiones medioambientales y sociales, así como relativas al personal, y con el respeto de los derechos humanos y la lucha contra la corrupción y el soborno." },
        { word: "Factoring", meaning: "Contrato por el que una persona o empresa cede a otra los créditos derivados de su actividad comercial (por ejemplo, recibos o facturas), encargándose esta última de gestionar su cobro." },
        { word: "Fecha de amortización", meaning: "1) Momento fijado para la cancelación parcial o total de un préstamo. 2) Fecha en la que el titular de un valor de renta fija ya no tiene derecho a recibir ningún pago más de intereses. En esa fecha sí recibe el valor nominal del título, es decir, recupera el capital invertido en él." },
        { word: "Fecha valor", meaning: "Fecha a partir de la cual una cantidad de dinero empieza a generar intereses, por ejemplo al abonarse en una cuenta corriente." },
        { word: "Fianza", meaning: "Contrato por el que una persona compromete un bien para garantizar el cumplimiento de una obligación, contraída por un tercero. Suele consistir en el depósito de un activo o una cantidad de dinero." },
    ],
    G: [
        { word: "Gananciales", meaning: "Régimen económico matrimonial que considera que los bienes adquiridos durante el matrimonio pertenecen a partes iguales a los dos cónyuges. Es el más extendido en España, aunque hay casos en los que los cónyuges optan por el régimen de separación de bienes, en el que cada cual cuenta con sus propios bienes." },
        { word: "Garante", meaning: "Persona o entidad que responde del pago de una deuda en el caso de que el deudor principal no lo haga. En muchas ocasiones, la figura del garante es imprescindible para la obtención de un crédito." },
        { word: "Garantía", meaning: "En operaciones a crédito, es la cuantía que se entrega para garantizar los compromisos contraídos. Consiste en el aseguramiento de una obligación principal, por ejemplo, mediante un documento suscrito por un tercero para garantizar a un banco que un cliente va a pagar un crédito. También se denomina garantía al conjunto de bienes con los que responder en caso de incumplir las condiciones pactadas del crédito." },
        { word: "Garantía bancaria", meaning: "Compromiso de una entidad financiera a favor de un cliente de la misma." },
        { word: "Garantía real", meaning: "Garantía constituida por bienes inmuebles, valores, etc." },
    ],
    H: [
        { word: "Hash", meaning: "RCódigo alfanumérico único de longitud fija, generado mediante un algoritmo criptográfico, que identifica un conjunto de datos (un documento, una imagen…) y que se utiliza para enlazar los diferentes bloques de una cadena de bloques. " },
        { word: "Hecho imponible", meaning: "El que genera la correspondiente obligación tributaria con Hacienda." },
        { word: "Hipoteca", meaning: "En términos coloquiales, se denomina hipoteca al préstamo con garantía hipotecaria, es decir, al que obtiene una persona a cambio de poner como garantía su vivienda (o la que será su vivienda). Pero, en realidad, la hipoteca solamente es la garantía, es decir, el derecho real sobre los bienes inmuebles que garantiza un contrato de préstamo o de apertura de crédito. El bien inmueble se hipoteca, se decir, se pone como garantía de que ese crédito se pagará." },
        { word: "Horizonte temporal", meaning: "Es el plazo de vida de la inversión (en algunos casos el producto tiene un plazo determinado o un vencimiento, por ejemplo un bono a 5 años -al quinto año la entidad emisora devuelve el capital al inversor). En algunos casos, los productos tienen una vida perpetua, las acciones, por ejemplo, no tienen vencimiento (al comprar acciones hacemos una aportación al capital de la entidad -nos convertimos en socios). Desde el punto de vista del inversor el horizonte temporal es el período de tiempo durante el cual está dispuesto a mantener invertido su capital, sin que prevea necesitarlo para otros fines." }

    ],
    I: [
        { word: "Inflación", meaning: "Proceso de aumento de precios en un país, que tiene carácter sostenido (se mantiene a lo largo de un periodo de tiempo) y generalizado (afecta a un número significativo de bienes y servicios). Implica una disminución del poder adquisitivo del dinero, y se mide a través del IPC (índice de precios al consumo). Tiene gran influencia en los mercados financieros, puesto que es uno de los indicadores más visibles de la salud de una economía La inflación es el fenómeno contrario a la deflación. " },

        { word: "Información periódica de fondos de inversión", meaning: "Documentos informativos que la sociedad gestora elabora y remite a los partícipes de cada uno de los fondos que administra, para informarles de la evolución del fondo. Los informes semestral y anual deben enviarse obligatoriamente y de forma gratuita al inversor; mientras que el informe trimestral se proporciona previa solicitud." },
        { word: "Informe de gobierno corporativo", meaning: "Documento que elaboran y difunden anualmente las sociedades cotizadas y las entidades financieras emisoras de valores. Explica de forma detallada la estructura y el funcionamiento de los órganos de gobierno de la entidad. Entre otros contenidos, incluye la composición del accionariado y de los órganos de administración, las operaciones vinculadas, los sistemas de control de riesgo, el funcionamiento de la junta general o asamblea y el grado de seguimiento de las recomendaciones de gobierno corporativo." },
        { word: "Ingresos", meaning: "Partida que refleja, en unidades monetarias, las ventas de una compañía. Es la cifra con la que comienza la cuenta de resultados." }
    ],
    J: [
        {word:"Junta general de accionistas", meaning:"Órgano de gobierno supremo de una sociedad en el que se adoptan por mayoría las principales decisiones societarias y estatutarias. La junta general puede ser ordinaria o extraordinaria. La junta ordinaria se debe celebrar necesariamente una vez al año, en los seis primeros meses después de cerrar el ejercicio económico. Es necesaria para aprobar la gestión del consejo de administración, el balance, la cuenta de resultados y la distribución de beneficios, si los hubiera. La junta extraordinaria se puede celebrar en cualquier momento, siempre que haya convocatoria previa."},
       
    ],
    
    L: [
        {word:"Leasing", meaning:"Arrendamiento financiero que consiste en alquilar o arrendar unos bienes determinados a cambio de una renta periódica. La sociedad de “leasing” ofrece además una opción de compra del bien por un valor residual al término del contrato. Esta opción permite que la persona o empresa que arrienda se pueda convertir finalmente en propietaria del bien alquilado."},
        {word:"Lenguaje de programación Turing-Completo", meaning:"Es aquel lenguaje de programación que tiene un nivel computacional similar a lo que se conoce como Máquina de Turing Universal. Se trata de la característica de un lenguaje de programación para resolver cualquier problema computacional e implementar estructuras complejas, como bucles e iteraciones. "},
        {word:"Letra de cambio", meaning:"Documento que obliga al pago de una cantidad en una fecha determinada (vencimiento) y a favor de un tercero, cuyo nombre ha de figurar en la letra. Quien emite la letra se llama librador y ordena el pago de la cantidad fijada a un tercero. La letra es negociable y se puede endosar, es decir, transmitir a terceros."},
        {word:"Librar", meaning:"Emitir letras de cambio, cheques, pagarés u otras órdenes de pago."},
        {word:"Libreta de ahorro", meaning:"Cuenta de ahorro que se diferencia de la cuenta corriente en que se instrumenta en una cartilla física y, normalmente, no permite operar con cheques. También puede tener otras características peculiares, dependiendo de la entidad (necesidad de preaviso para la retirada de fondos, no admisión de descubiertos, mayor remuneración, etc.)."},
        {word:"Línea de crédito", meaning:"Contrato por el que una entidad financiera se compromete a facilitar crédito a un cliente hasta un límite determinado. Durante el período de vigencia de la línea de crédito, el beneficiario puede disponer del dinero de forma automática sin necesidad de nuevas autorizaciones por parte de la entidad financiera."},
        {word:"Liquidación de intereses", meaning:"Pago de los intereses de acuerdo con el contrato de una cuenta bancaria."},
    ],
    M: [
        {word:"Máquina Virtual de Ethereum (Ethereum Virtual Machine)", meaning:"La máquina virtual de Ethereum es el código o entorno computacional encargado de implementar y ejecutar los contratos inteligentes de la red.  "},
        {word:"Mecanismo de consenso", meaning:"Método mediante el cual los nodos se aseguran que los datos almacenados en una cadena de bloques (blockchain) son válidos y no han sido modificados de forma no autorizada."},
        {word:"Medio plazo", meaning:"En los mercados financieros, se denomina así al horizonte temporal entre uno y tres años."},
        {word:"Memoria", meaning:"Informe que, junto al balance y a la cuenta de pérdidas y ganancias, forma parte de las cuentas anuales de una compañía. Su elaboración la deben realizar los administradores de la sociedad, en un plazo máximo de tres meses desde el cierre del ejercicio. La memoria amplía la información recogida en el balance y en la cuenta de pérdidas y ganancias. Entre otros aspectos, informa sobre la distribución de resultados y las normas de valoración de los activos."},
        {word:"Mercado continuo", meaning:"Sistema informatizado de contratación, que permite la negociación de los principales valores cotizados en la Bolsa española, de forma ininterrumpida, durante un amplio horario preestablecido, de forma electrónica. En estos momentos, el horario del mercado continuo es de 9:00 a 17:30. La transmisión de órdenes se realiza a través de terminales informáticas, gracias a las que se puede conocer en tiempo real los precios de compra y venta, así como el número de acciones disponibles en cada momento de cada compañía."},
        {word:"Mercado primario", meaning:"Es la forma en la que las entidades captan dinero en los mercados, mediante la emisión de nuevos valores (bonos o acciones). Es decir, los inversores obtienen títulos, que adquieren directamente de la entidad emisora."},
        {word:"Mercado secundario", meaning:"Al contrario que los mercados primarios, en los mercados secundarios se negocian títulos ya emitidos con anterioridad que estaban en poder de otros inversores. La bolsa es el mercado secundario más conocido."},
        {word:"Mercados emergentes", meaning:"Denominación de los mercados financieros de los países que disponen de un considerable potencial de crecimiento, como pueden ser los latinoamericanos, los asiáticos o los de las naciones europeas del antiguo bloque soviético."},
        {word:"Microeconomía", meaning:"Rama de la teoría económica que estudia las actividades económicas de las empresas y consumidores, a título individual. Mide, por tanto, el comportamiento concreto de un agente del mercado. La suma de las magnitudes microeconómicas individualizadas forman las magnitudes macroeconómicas."},
    ],
    N: [
        {word:"Nodos", meaning:"Participantes en una cadena de bloques (blockchain), que almacenan una copia completa de dicha cadena de bloques (blockchain) y contribuyen a crear un sistema resistente a ataques informáticos, fallos o falsificaciones."},
        {word:"Nodos de la red", meaning:"Dispositivos conectados a una red blockchain que almacenan una copia de la blockchain y pueden participar en el proceso de validación de transacciones y crea-ción de nuevos bloques."},
        {word:"Nodos Validadores", meaning:"Son los nodos encargados de validar transacciones y crear nuevos bloques en una red que utiliza el PoS."},
        {word:"Nómina", meaning:"Pago mensual que los trabajadores reciben de la empresa, como contraprestación por sus servicios."},
        {word:"Novación", meaning:"Acuerdo de las partes que han suscrito un contrato, para modificar una parte de su contenido. Se aplica, por ejemplo, a la modificación de las condiciones de un préstamo hipotecario."}
        
    ],
    O: [
        {word:"Obligación", meaning:"Activo financiero que representa una deuda a largo plazo de una sociedad con el propietario de la obligación. Es decir, la sociedad que emite las obligaciones se compromete a pagar a quienes las adquieren, los obligacionistas, un interés determinado, así como a devolver el capital inicial prestado en la fecha establecida para el vencimiento de los títulos. Algunas obligaciones son convertibles, ya que pueden ser convertidas en acciones."},
        {word:"Obligaciones del Estado", meaning:"Valores de renta fija a largo plazo emitidos por el Estado. Se emiten a 10, 15 y 30 años. A lo largo de su vida, estos activos pagan un tipo de interés fijo que se abona mediante cupones anuales. El Estado emisor se compromete a devolver el dinero invertido por los ahorradores en el plazo estipulado, además del pago correspondiente de intereses."},
        {word:"Oficinas de Atención al Accionista", meaning:"Funcionan en las principales empresas cotizadas. Tratan de resolver todas las dudas del accionista, sobre todo en lo relativo a juntas generales, abono de dividendos, evolución de la sociedad en bolsa, etc. La mayoría dispone de servicios de atención telefónica o por Internet."},
        {word:"OPA de exclusión", meaning:"Operación pública de adquisición que una empresa determinada realiza a sus propios accionistas para quedarse con la totalidad de las acciones. Esto implica que, a partir de ese momento, las acciones dejan de cotizar en bolsa. En esta modalidad, el precio de la opa requiere autorización expresa de la CNMV; por tanto, y para establecer un precio justo, la sociedad necesita aportar una valoración realizada por un experto independiente. En este tipo de opa, la contraprestación siempre es en dinero. Las acciones que no se hayan vendido en la opa de exclusión dejan de tener liquidez, por lo que si más tarde el inversor desea venderlas puede resultar mucho más complicado."},
        {word:"OPA Oferta Pública de Adquisición", meaning:"Operación mediante la cual una persona física o jurídica ofrece públicamente a los accionistas de una sociedad cotizada comprarles sus acciones, a un precio determinado. De este modo, la entidad que realiza la opa puede obtener una participación significativa en el capital de la sociedad. La opa siempre puede lanzarse con carácter voluntario, aunque hay supuestos en los que es obligatoria (por ejemplo, cuando un accionista acumula un elevado porcentaje del capital de la sociedad). El precio que se propone a los accionistas suele ser superior al del mercado, para animarles a que acepten la oferta. El pago de las acciones puede ser en dinero, en acciones o mixta (dinero y acciones). Los accionistas tienen un plazo para estudiarla y decidir si están interesados en aceptar el precio ofrecido. La opa puede ser amistosa, cuando hay acuerdo entre quien la lanza y los administradores y/o accionistas de la sociedad afectada, o bien hostil, cuando no existe tal acuerdo."},
        {word:"Opción financiera", meaning:"Contrato que implica el derecho a comprar o vender un activo (acciones, bonos, índices bursátiles, divisas, etc.), a un precio preestablecido (precio de ejercicio), y en un plazo estipulado. La opción de compra se denomina call y la de venta put."},
        {word:"Operación al contado", meaning:"Aquella en la que la liquidación no está diferida a un futuro. Cada mercado tiene unos periodos de liquidación para operaciones al contado en función de las diferentes reglas de funcionamiento de los mismos. Así, por ejemplo, en los mercados de divisas, las operaciones al contado son las que se liquidan en un máximo de dos días (D+2). Los plazos tienden a reducirse, gracias a las liquidaciones electrónicas que funcionan en la mayoría de los mercados financieros."},
    ],
    P: [
        {word:"Pagaré", meaning:"Título o documento por el que una persona física o jurídica se compromete a pagar una cantidad determinada en una fecha futura."},
        {word:"Pagarés de empresa", meaning:"Valores de renta fija emitidos al descuento (por debajo de su valor nominal) que representan una deuda a corto plazo contraída por una empresa. Normalmente, estos pagarés tienen un vencimiento inferior a 1 año."},
        {word:"Participación", meaning:"Cada una de las partes iguales en que se divide el patrimonio de un fondo de inversión. Su precio se denomina valor liquidativo."},
        {word:"Participaciones preferentes", meaning:"Activos que presentan características de los valores de renta fija y de los de renta variable. Sus titulares tienen derecho a percibir todos los años una cantidad predeterminada, siempre que existan suficientes beneficios en la sociedad. No otorgan derecho de asistencia a juntas generales ni derecho al voto. Son perpetuas, aunque el emisor puede acordar su amortización una vez transcurridos cinco años desde su emisión. Se negocian en el mercado AIAF de renta fija. En caso de liquidación de la compañía emisora, los inversores que tienen participaciones preferentes son casi los últimos en cobrar, sólo por delante de los accionistas."},
        {word:"Partícipe", meaning:"Titular de participaciones de un fondo de inversión. En el ámbito de los planes de pensiones es la persona física en cuyo interés se crea el plan, con independencia de quién realice las aportaciones. En los planes de pensiones de empleo pueden ser partícipes los empleados de la empresa o entidad promotora. En los planes de pensiones del sistema asociado pueden serlo los socios, miembros y afiliados de la asociación promotora. En los planes del sistema individual, promovidos por las entidades financieras para el público en general, puede ser partícipe cualquier persona física."},
        {word:"Pasaporte europeo", meaning:"En relación con los productos y servicios financieros, este término hace referencia a la posibilidad de ofrecer productos o servicios financieros fuera del país de origen, dentro del ámbito comunitario."},
        {word:"Patrimonio", meaning:"Conjunto de bienes y derechos que posee una persona."},
    ],
    Q: [
        {word:"Queja", meaning:"Incidencias planteadas por los usuarios de servicios financieros con motivo de retrasos, faltas de atención o cualquier otro tipo de actuación incorrecta por parte de las entidades que prestan servicios financieros."},
        {word:"Quita", meaning:"Petición formal de un deudor a sus acreedores para que rebajen su deuda, de manera que pueda por lo menos hacer frente a una parte de la misma."}
    ],
    R: [
        {word:"Rating", meaning:"Calificación elaborada por una empresa especializada para valorar a los emisores de deuda según su solidez financiera y su capacidad de pago en diferentes plazos de tiempo (largo/corto). Según el riesgo de quiebra de una empresa, institución o país, reciben las siguientes calificaciones (de mayor a menor calidad crediticia): AAA, AA, A, BBB u otras similares."},
        {word:"Rating ASG", meaning:"Evaluación de los factores ambientales, sociales y de buen gobierno en instrumentos financieros y empresas. Estas calificaciones pueden ser utilizadas por los inversores para tener en cuenta los riesgos y oportunidades relacionados con las cuestiones ASG. Actualmente el rating ASG no está regulado, por lo que la calidad de sus ratings o de las diferentes metodologías utilizadas no sigue unas pautas establecidas."},
        {word:"Ratio bursátil", meaning:"Indicador que permite comparar el comportamiento de las acciones, bien del mismo sector o de sectores diferentes."},
        {word:"Recesión", meaning:"Momento del ciclo económico en que se produce un crecimiento negativo en la economía. Normalmente, ese retroceso económico va acompañado de un crecimiento de las tasas de desempleo e inflación. Se considera que un país entra en recesión cuando su producto interior bruto (PIB) desciende durante al menos tres trimestres consecutivos."},
        {word:"Reclamación", meaning:"Solicitudes presentadas por los usuarios de los servicios financieros con la intención de que se restituya su interés o derecho. En la reclamación se deben poner de manifiesto las acciones u omisiones de las entidades financieras que pueden haber supuesto un perjuicio para los intereses del reclamante."},
        {word:"Recursos propios", meaning:"Fondos aportados por los accionistas, o beneficios generados por la empresa que no han sido repartidos. Comprenden, por tanto, el capital social, las reservas y los resultados que aún no hayan sido distribuidos."},
        {word:"Reembolso", meaning:"Operación por la que el partícipe recupera todo o parte del capital invertido en un fondo de inversión, mediante la venta de sus participaciones a la sociedad gestora."},
    ],
    S: [
        {word:"Salario bruto", meaning:"Remuneración del trabajador, antes de descontar sus contribuciones a la Seguridad Social y la retención del IRPF."},
        {word:"Salario mínimo interprofesional", meaning:"Es la retribución mínima que debe percibir un trabajador en relación con la jornada legal de trabajo. El gobierno lo fija anualmente, y se aplica para todas las actividades, sin distinción de sexo o edad de los trabajadores. Es la base mínima de cotización a la Seguridad Social."},
        {word:"Salario neto", meaning:"Importe efectivo que recibe el trabajador; es el salario bruto, después de restar las contribuciones a la Seguridad Social y la retención del IRPF."},
        {word:"Saldo", meaning:"En una cuenta bancaria, el saldo deudor expresa una deuda del titular con la entidad en que tiene abierta la cuenta; por el contrario, el saldo acreedor expresa una deuda de la entidad con el cliente, es decir, la cantidad de dinero de la que el cliente puede disponer. El saldo disponible es el que puede ser utilizado libremente. En ocasiones, saldo y disponible no coinciden. Por ejemplo, cuando la entidad retiene una parte del saldo del cliente para atender una orden de pago que todavía no ha sido liquidada"},
        {word:"Satoshi Nakamoto", meaning:"Pseudónimo del creador o creadores de Bitcoin."},
        {word:"SEC", meaning:"Securities and Exchange Commission. Órgano regulador y supervisor de los mercados de valores de Estados Unidos (equivalente a la Comisión Nacional del Mercado de Valores, CNMV, que supervisa los mercados españoles)."},
        {word:"Secreto bancario", meaning:"Compromiso de todas las instituciones financieras (no sólo de los bancos) para mantener la máxima discreción en torno a la situación financiera de sus clientes."},
    ],
    T: [
        {word:"Talón", meaning:"Ver Cheque."},
        {word:"Tarjeta de crédito", meaning:"Instrumento que permite realizar pagos sin tener dinero en efectivo. El cargo en la cuenta se produce, por lo general, al final del mes. También se puede trasladar el pago más allá de ese momento, pero esta operación conlleva el pago de intereses. Estas tarjetas también permiten retirar dinero en efectivo en los cajeros automáticos, aunque hay que pagar comisiones."},
        {word:"Tarjeta de débito", meaning:"Al igual que la tarjeta de crédito, es un medio que permite realizar pagos sin tener dinero en efectivo. La diferencia es que con la tarjeta de débito el cargo en la cuenta se produce inmediatamente, con lo que si no existe disponible el pago no se podrá realizar. Estas tarjetas también permiten retirar dinero en efectivo en los cajeros automáticos, aunque normalmente con comisiones si no se utiliza la red propia de la tarjeta."},
        {word:"Tarjeta monedero", meaning:"Medio electrónico para el pago de pequeñas cantidades, que se va recargando a medida que se acaba el saldo. La recarga puede realizarse a través de cajeros automáticos."},
        {word:"Tasación", meaning:"Cálculo del valor de un determinado bien. Por ejemplo, antes de la contratación de un préstamo hipotecario se suele exigir que una compañía especializada (sociedad de tasación) tase la vivienda para conocer su valor real."},
        {word:"Tasación de daños", meaning:"En el ámbito de los seguros, sinónimo de peritaje. Acción que permite al asegurador determinar las consecuencias económicas de un siniestro, con el objeto de cuantificar el importe de la indemnización que deberá satisfacer."},
        {word:"Test de Howey", meaning:"Criterio legal en Estados Unidos que determina si un activo es considerado un valor y, por lo tanto, está sujeto a las regulaciones financieras correspondientes. "},
    ],
    U: [
        {word:"Último cambio", meaning:"Último precio del día al cual se ha realizado una operación de compraventa de un título, bono o acción."},
        {word:"Unit-linked", meaning:"Término anglosajón, por el que se designa una modalidad de seguro de vida en la que el tomador asume el riesgo de una inversión, ya que la indemnización a percibir dependerá de la rentabilidad de los productos financieros a los que se vincule el seguro. Estos productos están bajo la supervisión de la Dirección General de Seguros y Fondos de Pensiones."}
    ],
    V: [
        {word:"Valor de nuevo", meaning:"En el ámbito de los seguros, precio de venta del objeto asegurado en estado de nuevo."},
        {word:"Valor liquidativo", meaning:"Precio unitario de la participación en un fondo de inversión. Se calcula dividiendo el patrimonio del fondo entre el número de participaciones en circulación en ese momento. A su vez, el patrimonio se calcula en función del precio de mercado de los activos, a los que se restan gastos y comisiones que aplica la sociedad gestora del fondo. La sociedad gestora es la encargada de calcular y publicar diariamente el valor liquidativo del fondo. El funcionamiento y las características de la inversión colectiva se detallan en la sección sobre fondos de inversión del Portal del Inversor de la CNMV."},
        {word:"Valor negociable", meaning:"Título cuya característica principal es que se puede transmitir en los mercados. Las acciones y los bonos son valores negociables."},
        {word:"Valor nominal", meaning:"Valor que consta en el título. Es un valor teórico que el emisor establece como precio unitario del activo. En el caso de los bonos y obligaciones, el valor nominal suele coincidir con el valor de reembolso."},
        {word:"Valor venal", meaning:"En el ámbito de los seguros, valor de venta que tiene el objeto asegurado en el momento inmediatamente anterior a producirse el siniestro."},
        {word:"Vencimiento", meaning:"Fecha en la que expira un contrato financiero, o en la que se devuelve al inversor la cantidad que abonó cuando compró un valor de renta fija."},
        {word:"Vencimiento del seguro", meaning:"Finalización de los efectos de una póliza de seguro, como consecuencia del cumplimiento del periodo de duración del contrato."},
    ],
    W: [
        {word:"Wall Street", meaning:"Calle en la que tienen su sede las principales entidades financieras de Nueva York. Por extensión, la Bolsa de Nueva York."},
        {word:"Warrants", meaning:"Son opciones que dan el derecho de comprar o vender un activo, a un precio de ejercicio determinado, en una fecha futura. La diferencia básica con las opciones es que los warrants son emitidos por entidades financieras, que se encargan de dar precio a los mismos durante toda la vida de estos productos. Es un producto derivado, que se describe con más detalle en la sección sobre warrants del Portal del Invesor de la CNMV."},
        {word:"Web 1.0", meaning:"Conocida como la web estática, fue la primera versión de la World Wide Web. Se caracterizó por ser unidireccional, donde los usuarios podían acceder a información pero no interactuar con ella."},
        {word:"Web 2.0", meaning:"La evolución de la Web 1.0 y se centra en la interacción social y el contenido ge-nerado por los usuarios, lo que permite una experiencia más dinámica y personalizada."},
        {word:"Web 3.0", meaning:"Conocida como la web descentralizada es la próxima evolución de la Web. Se basa en tecnologías como blockchain, criptoactivos y smart contracts para ofrecer una experiencia de usuario más segura, privada y descentralizada."}
    ]

};

const graph = buildGraph(glosaryData);
connectNodes(graph);


function findRelatedWords(graph: Graph, startWord: string, depth: number = 1): string[] {
    const visited = new Set<string>();
    const result: string[] = [];

    function dfs(word: string, currentDepth: number): void {
        if (currentDepth > depth || visited.has(word)) return;
        visited.add(word);
        result.push(word);

        const neighbors = graph.get(word)?.neighbors || [];
        for (const neighbor of neighbors) {
            dfs(neighbor, currentDepth + 1);
        }
    }

    dfs(startWord, 0);
    return result;
}

function GlosaryPage() {
    const [selectedLetter, setSelectedLetter] = useState<keyof GlosaryData>("A");
    const [searchQuery, setSearchQuery] = useState<string>(""); // Para rastrear la búsqueda del usuario
    const [searchResults, setSearchResults] = useState<GlosaryEntry[]>([]); // Resultados de búsqueda

    const handleLetterClick = (letter: keyof GlosaryData) => {
        setSelectedLetter(letter);
        setSearchQuery(""); // Limpiar el buscador al cambiar de letra
        setSearchResults([]);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        let query = event.target.value.trim();
    
        // Capitaliza la primera letra del texto ingresado
        if (query) {
            query = query.charAt(0).toUpperCase() + query.slice(1);
        }
    
        setSearchQuery(query);
    
        if (!query) {
            setSearchResults([]);
            return;
        }
    
        const lowerQuery = query.toLowerCase(); // Comparación insensible a mayúsculas
        const matches = [...graph.values()]
            .filter(({ data }) => data.word.toLowerCase().includes(lowerQuery))
            .map(({ data }) => data);
    
        setSearchResults(matches);
    };
    
    
    

    return (
        <>
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 1000,
                }}
            >
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a
                            className="navbar-brand"
                            href="/authenticated"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                            }}
                        >
                            <p
                                className="mb-0"
                                style={{ color: "#00A2B6", fontWeight: "bold" }}
                            >
                                Smart
                            </p>
                            <p className="mb-0" style={{ color: "black", fontWeight: "bold" }}>
                                Finanzas
                            </p>
                        </a>
                    </div>
                </nav>
            </header>

            <div style={{ paddingTop: "100px", textAlign: "center" }}>
                <h2 style={{ color: "white" }}>Bienvenido al glosario</h2>

                {/* Letter Navigation */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "20px 0",
                        flexWrap: "wrap",
                    }}
                >
                    {Object.keys(glosaryData).map((letter) => (
                        <button
                            key={letter}
                            onClick={() => handleLetterClick(letter as keyof GlosaryData)}
                            style={{
                                margin: "5px",
                                padding: "10px",
                                borderRadius: "50%",
                                backgroundColor:
                                    selectedLetter === letter ? "#333" : "#f1f1f1",
                                color: selectedLetter === letter ? "white" : "black",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "16px",
                            }}
                        >
                            {letter}
                        </button>
                    ))}
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "10vh",
                        textAlign: "center",
                    }}
                >
                    <label
                        htmlFor="inputPassword5"
                        className="form-label"
                        style={{ color: "white", marginBottom: "1rem" }}
                    >
                        Buscador de palabras
                    </label>
                    <div style={{ position: "relative", width: "25rem" }}>
                        <input
                            style={{
                                width: "100%",
                                paddingLeft: "2.5rem", /* Espacio para el icono */
                                textAlign: "center",
                                borderRadius: "8px",
                            }}
                            placeholder="Insertar una palabra para buscar"
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            className="form-control"
                        />
                        <span
                            style={{
                                position: "absolute",
                                left: "0.5rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                fontSize: "1.2rem",
                                color: "#888",
                            }}
                        >
                            🔍
                        </span>
                    </div>
                </div>

                <div
                    style={{
                        margin: "20px",
                        marginBottom: "10rem",
                        textAlign: "left",
                        height: "400px",
                        overflowY: "auto",
                        backgroundColor: "#333",
                        borderRadius: "10px",
                        padding: "15px",
                    }}
                >
                    <h3 style={{ color: "white" }}>
                        {searchQuery
                            ? `Resultados de búsqueda para "${searchQuery}":`
                            : `Palabras con ${selectedLetter}:`}
                    </h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {searchQuery
                            ? searchResults.map((entry, index) => (
                                  <li
                                      key={index}
                                      style={{
                                          background: "#f9f9f9",
                                          margin: "10px 0",
                                          padding: "10px",
                                          borderRadius: "5px",
                                          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                                      }}
                                  >
                                      <strong>{entry.word}:</strong> {entry.meaning}
                                  </li>
                              ))
                            : glosaryData[selectedLetter]?.map((entry, index) => (
                                <li
                                key={index}
                                style={{
                                    background: index % 2 === 0 ? "#eee" : "#ddd",
                                    margin: "10px 0",
                                    padding: "15px",
                                    borderRadius: "8px",
                                    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                                    transition: "transform 0.2s",
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            >
                                <strong>{entry.word}:</strong> {entry.meaning}
                            </li>
                            
                              ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default GlosaryPage;
