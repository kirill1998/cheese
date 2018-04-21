<?php
namespace Worldpay\Payments\Controller\Apm\Cancel;

/**
 * Interceptor class for @see \Worldpay\Payments\Controller\Apm\Cancel
 */
class Interceptor extends \Worldpay\Payments\Controller\Apm\Cancel implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Worldpay\Payments\Model\Methods\WorldpayPayments $Worldpay, \Magento\Payment\Helper\Data $paymentHelper, \Magento\Sales\Model\OrderFactory $orderFactory, \Magento\Checkout\Model\Session $checkoutSession, \Magento\Checkout\Helper\Data $checkoutData, \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory, \Magento\Sales\Model\Order\Email\Sender\OrderSender $orderSender, $params = array())
    {
        $this->___init();
        parent::__construct($context, $Worldpay, $paymentHelper, $orderFactory, $checkoutSession, $checkoutData, $resultJsonFactory, $orderSender, $params);
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
