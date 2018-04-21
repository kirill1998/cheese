<?php
namespace Accord\Checkout\Controller\Sidebar\UpdateItemQty;

/**
 * Interceptor class for @see \Accord\Checkout\Controller\Sidebar\UpdateItemQty
 */
class Interceptor extends \Accord\Checkout\Controller\Sidebar\UpdateItemQty implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Magento\Checkout\Model\Sidebar $sidebar, \Psr\Log\LoggerInterface $logger, \Magento\Framework\Json\Helper\Data $jsonHelper, \Magento\Checkout\Model\Cart $cart, \Accord\Quote\Helper\Item\OptionManager $optionManager)
    {
        $this->___init();
        parent::__construct($context, $sidebar, $logger, $jsonHelper, $cart, $optionManager);
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
