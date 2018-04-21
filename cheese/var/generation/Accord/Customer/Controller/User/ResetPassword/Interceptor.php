<?php
namespace Accord\Customer\Controller\User\ResetPassword;

/**
 * Interceptor class for @see \Accord\Customer\Controller\User\ResetPassword
 */
class Interceptor extends \Accord\Customer\Controller\User\ResetPassword implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Magento\Framework\View\Result\PageFactory $resultPageFactory, \Accord\Customer\Helper\Customer\Customer $helperCustomer, \Magento\Customer\Model\ResourceModel\CustomerRepository $customerRepository, \Magento\Customer\Model\AccountManagement $accountManagement, \Accord\Customer\Controller\User\AbstractController\CustomerLoader $customerLoader, \Magento\Framework\Registry $registry)
    {
        $this->___init();
        parent::__construct($context, $resultPageFactory, $helperCustomer, $customerRepository, $accountManagement, $customerLoader, $registry);
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
