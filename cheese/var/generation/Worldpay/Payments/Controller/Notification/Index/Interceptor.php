<?php
namespace Worldpay\Payments\Controller\Notification\Index;

/**
 * Interceptor class for @see \Worldpay\Payments\Controller\Notification\Index
 */
class Interceptor extends \Worldpay\Payments\Controller\Notification\Index implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Magento\Sales\Model\OrderFactory $modelOrderFactory, \Magento\Sales\Model\Order\PaymentFactory $orderPaymentFactory, \Worldpay\Payments\Model\Methods\WorldpayPayments $Worldpay)
    {
        $this->___init();
        parent::__construct($context, $modelOrderFactory, $orderPaymentFactory, $Worldpay);
    }

    /**
     * {@inheritdoc}
     */
    public function dispatch(\Magento\Framework\App\RequestInterface $request)
    {
        $pluginInfo = $this->pluginList->getNext($this->subjectType, 'dispatch');
        if (!$pluginInfo) {
            return parent::dispatch($request);
        } else {
            return $this->___callPlugins('dispatch', func_get_args(), $pluginInfo);
        }
    }
}
