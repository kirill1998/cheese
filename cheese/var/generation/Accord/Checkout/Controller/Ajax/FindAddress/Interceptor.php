<?php
namespace Accord\Checkout\Controller\Ajax\FindAddress;

/**
 * Interceptor class for @see \Accord\Checkout\Controller\Ajax\FindAddress
 */
class Interceptor extends \Accord\Checkout\Controller\Ajax\FindAddress implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Magento\Framework\View\Result\PageFactory $resultPageFactory, \Accord\Checkout\Helper\FindAddressesHelper $findAddressesHelper, \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory)
    {
        $this->___init();
        parent::__construct($context, $resultPageFactory, $findAddressesHelper, $resultJsonFactory);
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
