<?php
namespace Accord\FindNearestDepot\Controller\Depot\Nearest;

/**
 * Interceptor class for @see \Accord\FindNearestDepot\Controller\Depot\Nearest
 */
class Interceptor extends \Accord\FindNearestDepot\Controller\Depot\Nearest implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Magento\Framework\View\Result\PageFactory $resultPageFactory, \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory, \Accord\FindNearestDepot\Helper\GeolocationHelper $geolocationHelper, \Accord\Customer\Helper\Current\User $currentUser)
    {
        $this->___init();
        parent::__construct($context, $resultPageFactory, $resultJsonFactory, $geolocationHelper, $currentUser);
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
