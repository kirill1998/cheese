<?php
namespace Worldpay\Payments\Controller\Saved\Index;

/**
 * Interceptor class for @see \Worldpay\Payments\Controller\Saved\Index
 */
class Interceptor extends \Worldpay\Payments\Controller\Saved\Index implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Magento\Customer\Model\Session $customerSession, \Magento\Framework\View\Result\PageFactory $resultPageFactory, \Magento\Customer\Model\Url $customerUrl, \Worldpay\Payments\Model\Resource\SavedCard\CollectionFactory $savedCardFactory)
    {
        $this->___init();
        parent::__construct($context, $customerSession, $resultPageFactory, $customerUrl, $savedCardFactory);
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
