<?php
namespace Accord\Api\Action\SettlementRequest\Push;

/**
 * Interceptor class for @see \Accord\Api\Action\SettlementRequest\Push
 */
class Interceptor extends \Accord\Api\Action\SettlementRequest\Push implements \Magento\Framework\Interception\InterceptorInterface
{
    use \Magento\Framework\Interception\Interceptor;

    public function __construct(\Magento\Framework\Webapi\Rest\Request $request, \Magento\Framework\Webapi\Rest\Response $response, \Magento\Webapi\Controller\Rest\Router $router, \Magento\Framework\ObjectManagerInterface $objectManager, \Magento\Framework\App\State $appState, \Magento\Framework\Webapi\Authorization $authorization, \Magento\Framework\Webapi\ServiceInputProcessor $serviceInputProcessor, \Magento\Framework\Webapi\ErrorProcessor $errorProcessor, \Magento\Webapi\Controller\PathProcessor $pathProcessor, \Magento\Framework\App\AreaList $areaList, \Magento\Framework\Webapi\Rest\Response\FieldsFilter $fieldsFilter, \Magento\Webapi\Controller\Rest\ParamsOverrider $paramsOverrider, \Magento\Framework\Webapi\ServiceOutputProcessor $serviceOutputProcessor, \Magento\Webapi\Model\Rest\Swagger\Generator $swaggerGenerator, \Magento\Store\Model\StoreManagerInterface $storeManager, \Magento\Framework\Event\Manager $eventManager, \Magento\Catalog\Model\ProductRepository $productRepository, \Magento\Sales\Controller\Adminhtml\Order\CreditmemoLoader $creditmemoLoader, \Magento\Sales\Model\Order\Email\Sender\CreditmemoSender $creditmemoSender, \Magento\Sales\Model\Order $order, \Magento\Sales\Model\Order\CreditmemoFactory $creditmemoFactory, \Magento\Framework\Pricing\PriceCurrencyInterface $priceCurrency, \Magento\Sales\Model\Service\InvoiceService $invoiceService, \Psr\Log\LoggerInterface $logger, \Magento\Framework\DB\Transaction $transaction)
    {
        $this->___init();
        parent::__construct($request, $response, $router, $objectManager, $appState, $authorization, $serviceInputProcessor, $errorProcessor, $pathProcessor, $areaList, $fieldsFilter, $paramsOverrider, $serviceOutputProcessor, $swaggerGenerator, $storeManager, $eventManager, $productRepository, $creditmemoLoader, $creditmemoSender, $order, $creditmemoFactory, $priceCurrency, $invoiceService, $logger, $transaction);
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
