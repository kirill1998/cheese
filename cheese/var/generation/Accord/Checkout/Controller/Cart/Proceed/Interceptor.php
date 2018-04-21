<?php
namespace Accord\Checkout\Controller\Cart\Proceed;

/**
 * Interceptor class for @see \Accord\Checkout\Controller\Cart\Proceed
 */
class Interceptor extends \Accord\Checkout\Controller\Cart\Proceed implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Magento\Framework\View\Result\PageFactory $resultPageFactory, \Magento\Checkout\Model\Cart $cart, \Magento\Checkout\Model\Session $checkout, \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory, \Accord\Integration\Helper\CheckStock $checkStock)
    {
        $this->___init();
        parent::__construct($context, $resultPageFactory, $cart, $checkout, $resultJsonFactory, $checkStock);
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
