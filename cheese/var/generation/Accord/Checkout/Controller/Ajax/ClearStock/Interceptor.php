<?php
namespace Accord\Checkout\Controller\Ajax\ClearStock;

/**
 * Interceptor class for @see \Accord\Checkout\Controller\Ajax\ClearStock
 */
class Interceptor extends \Accord\Checkout\Controller\Ajax\ClearStock implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Magento\Framework\View\Result\PageFactory $resultPageFactory, \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory, \Magento\Framework\ObjectManagerInterface $objectManager, \Magento\Checkout\Model\Session $_checkoutSession, \Accord\Integration\Helper\CheckStock $checkStock, \Magento\Checkout\Model\Cart $cart, \Magento\Framework\Message\ManagerInterface $messageManager)
    {
        $this->___init();
        parent::__construct($context, $resultPageFactory, $resultJsonFactory, $objectManager, $_checkoutSession, $checkStock, $cart, $messageManager);
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
