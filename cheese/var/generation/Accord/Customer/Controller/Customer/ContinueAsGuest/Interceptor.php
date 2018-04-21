<?php
namespace Accord\Customer\Controller\Customer\ContinueAsGuest;

/**
 * Interceptor class for @see \Accord\Customer\Controller\Customer\ContinueAsGuest
 */
class Interceptor extends \Accord\Customer\Controller\Customer\ContinueAsGuest implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Magento\Framework\View\Result\PageFactory $resultPageFactory, \Accord\Customer\Helper\Current\User $currentUser, \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig, \Accord\Integration\Helper\DepotProcessor $depotProcessor, \Accord\Customer\Helper\Customer\Customer $customerHelper)
    {
        $this->___init();
        parent::__construct($context, $resultPageFactory, $currentUser, $scopeConfig, $depotProcessor, $customerHelper);
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
