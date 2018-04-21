<?php
namespace Accord\Checkout\Controller\Ajax\SaveCustomerRefToQuote;

/**
 * Interceptor class for @see \Accord\Checkout\Controller\Ajax\SaveCustomerRefToQuote
 */
class Interceptor extends \Accord\Checkout\Controller\Ajax\SaveCustomerRefToQuote implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Magento\Framework\View\Result\PageFactory $resultPageFactory, \Magento\Checkout\Model\Session $checkoutSession, \Magento\Quote\Api\CartRepositoryInterface $quoteRepository)
    {
        $this->___init();
        parent::__construct($context, $resultPageFactory, $checkoutSession, $quoteRepository);
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
