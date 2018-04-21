<?php
namespace Accord\Api\Action\Orders\Push;

/**
 * Interceptor class for @see \Accord\Api\Action\Orders\Push
 */
class Interceptor extends \Accord\Api\Action\Orders\Push implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\Webapi\Rest\Request $request, \Magento\Framework\Webapi\Rest\Response $response, \Magento\Webapi\Controller\Rest\Router $router, \Magento\Framework\ObjectManagerInterface $objectManager, \Magento\Framework\App\State $appState, \Magento\Framework\Webapi\Authorization $authorization, \Magento\Framework\Webapi\ServiceInputProcessor $serviceInputProcessor, \Magento\Framework\Webapi\ErrorProcessor $errorProcessor, \Magento\Webapi\Controller\PathProcessor $pathProcessor, \Magento\Framework\App\AreaList $areaList, \Magento\Framework\Webapi\Rest\Response\FieldsFilter $fieldsFilter, \Magento\Webapi\Controller\Rest\ParamsOverrider $paramsOverrider, \Magento\Framework\Webapi\ServiceOutputProcessor $serviceOutputProcessor, \Magento\Webapi\Model\Rest\Swagger\Generator $swaggerGenerator, \Magento\Store\Model\StoreManagerInterface $storeManager, \Magento\Framework\Event\Manager $eventManager, \Magento\Catalog\Model\ProductRepository $productRepository, \Magento\Customer\Model\CustomerFactory $customerFactory, \Accord\Api\Order\Factory $orderFactory, \Accord\Api\Helper\Order $orderHelper, \Magento\Sales\Api\OrderRepositoryInterface $orderRepository, \Magento\Framework\Registry $registry, \Magento\Sales\Api\Data\OrderItemInterfaceFactory $orderItemFactory, \Magento\Quote\Model\Quote\Item\ToOrderItem $toOrderItem, \Magento\Quote\Model\QuoteRepository $quoteRepository)
    {
        $this->___init();
        parent::__construct($request, $response, $router, $objectManager, $appState, $authorization, $serviceInputProcessor, $errorProcessor, $pathProcessor, $areaList, $fieldsFilter, $paramsOverrider, $serviceOutputProcessor, $swaggerGenerator, $storeManager, $eventManager, $productRepository, $customerFactory, $orderFactory, $orderHelper, $orderRepository, $registry, $orderItemFactory, $toOrderItem, $quoteRepository);
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
