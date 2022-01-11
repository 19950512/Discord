<?php

$a = [
  'bot_id' => 2,
  'mensagem' => 'Allow',
  'files' => [
    [
      'name' => 'nome.txt',
      'attachment' => 'Valloores'
    ],
    [
      'name' => 'teste.txt',
      'attachment' => 'bolas bolas bolas'
    ]
  ]
];

$a = [
  'bot_id' => 2,
  'mensagem' => 'Allow',
];

/* $a = [
  'bot_id' => 2,
  'mensagem' => 'Allow',
  'embeds' => [
    [
      'description' => 'teste',
      'image' => [
        'url' => 'https://i.pinimg.com/originals/a1/20/c9/a120c97ad5042135c9e25d211d501bce.jpg' 
      ]
    ]
  ]
]; */

echo base64_encode(json_encode($a));

?>