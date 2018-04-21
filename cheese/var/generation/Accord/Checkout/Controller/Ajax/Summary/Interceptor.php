<?php
namespace Accord\Checkout\Controller\Ajax\Summary;

/**
 * Interceptor class for @see \Accord\Checkout\Controller\Ajax\Summary
 */
class Interceptor extends \Accord\Checkout\Controller\Ajax\Summary implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Magento\Framework\View\Result\PageFactory $resultPageFactory, \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory, \Magento\Checkout\Model\Session $_checkoutSession, \Accord\General\Helper\Checkout\CalculateCartManager $calculateCartManager, \Magento\Checkout\Helper\Data $checkoutHelper)
    {
        $this->___init();
        parent::__construct($context, $resultPageFactory, $resultJsonFactory, $_checkoutSession, $calculateCartManager, $checkoutHelper);
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
