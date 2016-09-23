<?php
/**
 * @link http://www.ideoris.com.au
 * @copyright Copyright (c) 2016 Ideoris Pty Ltd.
 * @license http://www.yiiframework.com/license/
 * @version flash-message.php $26-04-2016 12:35:53$
 * 
 * @author Pawan Kumar <info@ideoris.com.au>
 */
?>
<?php foreach (Yii::$app->session->getAllFlashes() as $key => $message): ?>
    <?php if ($key == 'success'): ?>
        <div class="alert alert-success alert-dismissible fade in" role="alert">
            <button class="close" aria-label="Close" data-dismiss="alert" type="button"><span aria-hidden="true">×</span></button>
            <p><?= $message ?></p>
        </div>
    <?php else: ?>
        <div class="alert alert-danger alert-dismissible fade in" role="alert">
            <button class="close" aria-label="Close" data-dismiss="alert" type="button"><span aria-hidden="true">×</span></button>
            <h4><?= $message ?></h4>
        </div>
    <?php endif; ?>
<?php endforeach; ?>
                        




