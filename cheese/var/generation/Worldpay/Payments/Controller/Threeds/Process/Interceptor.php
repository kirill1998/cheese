<?php
namespace Worldpay\Payments\Controller\Threeds\Process;

/**
 * Interceptor class for @see \Worldpay\Payments\Controller\Threeds\Process
 */
class Interceptor extends \Worldpay\Payments\Controller\Threeds\Process implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Magento\Framework\View\LayoutFactory $viewLayoutFactory, \Magento\Payment\Helper\Data $paymentHelper, \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory, \Magento\Sales\Model\OrderFactory $orderFactory, \Magento\Checkout\Model\Session $checkoutSession, \Magento\Sales\Model\Order\Email\Sender\OrderSender $orderSender)
    {
        $this->___init();
        parent::__construct($context, $viewLayoutFactory, $paymentHelper, $resultJsonFactory, $orderFactory, $checkoutSession, $orderSender);
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
