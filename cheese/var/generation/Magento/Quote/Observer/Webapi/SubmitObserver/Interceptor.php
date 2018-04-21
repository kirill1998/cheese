<?php
namespace Magento\Quote\Observer\Webapi\SubmitObserver;

/**
 * Interceptor class for @see \Magento\Quote\Observer\Webapi\SubmitObserver
 */
class Interceptor extends \Magento\Quote\Observer\Webapi\SubmitObserver implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Psr\Log\LoggerInterface $logger, \Magento\Sales\Model\Order\Email\Sender\OrderSender $orderSender)
    {
        $this->___init();
        parent::__construct($logger, $orderSender);
    }

    /**
     * {@inheritdoc}
     */
    public function execute(\Magento\Framework\Event\Observer $observer)
    {
        $pluginInfo = $this->pluginList->getNext($this->subjectType, 'execute');
        if (!$pluginInfo) {
            return parent::execute($observer);
        } else {
            return $this->___callPlugins('execute', func_get_args(), $pluginInfo);
        }
    }
}
