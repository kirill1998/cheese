<?php
namespace Accord\Customer\Controller\Customer\PostcodeByCoordinates;

/**
 * Interceptor class for @see \Accord\Customer\Controller\Customer\PostcodeByCoordinates
 */
class Interceptor extends \Accord\Customer\Controller\Customer\PostcodeByCoordinates implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\App\Action\Context $context, \Magento\Framework\View\Result\PageFactory $resultPageFactory, \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory, \Accord\FindNearestDepot\Helper\GeolocationHelper $geolocationHelper)
    {
        $this->___init();
        parent::__construct($context, $resultPageFactory, $resultJsonFactory, $geolocationHelper);
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
