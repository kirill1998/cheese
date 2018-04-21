<?php
namespace Accord\Customer\Controller\User\Save;

/**
 * Interceptor class for @see \Accord\Customer\Controller\User\Save
 */
class Interceptor extends \Accord\Customer\Controller\User\Save implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Magento\Framework\View\Result\PageFactory $resultPageFactory, \Magento\Framework\Data\Form\FormKey\Validator $formKeyValidator, \Magento\Customer\Model\ResourceModel\CustomerRepository $customerRepository, \Magento\Customer\Model\Session $customerSession, \Accord\Customer\Controller\User\AbstractController\CustomerLoader $customerLoader, \Accord\Customer\Controller\User\AbstractController\CustomerSave $customerSave, \Magento\Framework\Registry $registry, \Magento\Framework\App\State $state)
    {
        $this->___init();
        parent::__construct($context, $resultPageFactory, $formKeyValidator, $customerRepository, $customerSession, $customerLoader, $customerSave, $registry, $state);
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
