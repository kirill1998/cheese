<?php
namespace Accord\Validation\Controller\SelectCustomer\Select;

/**
 * Interceptor class for @see \Accord\Validation\Controller\SelectCustomer\Select
 */
class Interceptor extends \Accord\Validation\Controller\SelectCustomer\Select implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Accord\Customer\Helper\Customer\Customer $helperCustomer, \Magento\Store\Model\StoreManagerInterface $storeManager)
    {
        $this->___init();
        parent::__construct($context, $helperCustomer, $storeManager);
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
