## ICP备案查询
### 使用场景：主域名列表

如果您不会写代码，可以参考 **[AI助手功能](/guide/AI助手使用教程)** 进行修改；如果会写代码，可以按照以下步骤自行实现一个通过 HTTP 查询域名备案信息的脚本：

1. 点击 **工作流管理-任务列表**，找到已有的 ICP 备案查询任务，点击编辑：  

![picture 5](https://github.com/testnet0/testnet/raw/main/ec272571903372fd01f58f70feff00de16123f678aae040b4336e0daf36013a2.png)  

2. 修改脚本内容部分，例如：  
   假设您找到的一个 ICP 备案查询接口为 `https://abc.com/api/icp/index.php?url=baidu.com`，返回包格式如下：
```
{ "id": "10900", "url": "baidu.com", "unitName": "北京百度网讯科技有限公司", "natureName": "暂无", "icp": "京ICP证030173号-1", "siteName": "暂无", "Audit_time": "暂无", "query_time": "2019-05-16 00:00:00" }
```
修改脚本内容时，分为以下 3 步：发起请求、读取返回包、发送结果。可以参考以下代码：
```
import cn.iotaa.testnet.service.ILiteFlowMessageSendService;  
import com.alibaba.fastjson.JSONObject;  
import com.yomahub.liteflow.script.ScriptExecuteWrap;  
import com.yomahub.liteflow.script.body.JaninoCommonScriptBody;  
import com.yomahub.liteflow.spi.holder.ContextAwareHolder;  
import org.jeecg.modules.cn.iotaa.dto.DomainToCompanyDTO;  
import org.jeecg.modules.cn.iotaa.entity.HttpResponse;  
import org.jeecg.modules.cn.iotaa.entity.liteflow.TaskExecuteMessage;  
import org.jeecg.modules.cn.iotaa.utils.HttpUtils;  

/**
* 脚本名称：查询ICP备案信息  
* 适用资产：域名  
* 配置：  
* 结果处理类名: domainToCompanyProcessor  
*/
public class ICPApi1 implements JaninoCommonScriptBody {  
 public Void body(ScriptExecuteWrap wrap) {  
     TaskExecuteMessage taskExecuteMessage = (TaskExecuteMessage) wrap.cmp.getRequestData();  
     ILiteFlowMessageSendService sendService = (ILiteFlowMessageSendService) ContextAwareHolder.loadContextAware().getBean(ILiteFlowMessageSendService.class);  

     // 获取参数信息  
     JSONObject instanceParams = JSONObject.parseObject(taskExecuteMessage.getInstanceParams());  
     // 设置任务的 ID，此行不能删除  
     sendService.setInstanceId(taskExecuteMessage.getInstanceId());  
     sendService.INFO("开始查询ICP备案信息");  

     try {  
         // 从参数中拿到要查询的域名  
         String domain = instanceParams.getString("domain");  
         // 发起 HTTP GET 请求  
         HttpResponse response = HttpUtils.get("https://abc.com/api/icp/index.php?url=" + domain);  

         // 判断返回包状态码是否为 200  
         if (response.getStatusCode() == 200) {  
             sendService.INFO("查询备案成功，返回包:{}", response.getBody());  

             // 转为 FastJSON 对象  
             JSONObject jsonObject = JSONObject.parseObject(response.getBody());  
             String company = jsonObject.getString("unitName");  
             String icpNumber = jsonObject.getString("icp");  

             sendService.INFO("查询到备案信息，公司名称：{}, 备案号:{}", company, icpNumber);  

             // 构建结果  
             DomainToCompanyDTO domainToCompanyDTO = new DomainToCompanyDTO();  
             domainToCompanyDTO.setIcpNumber(icpNumber);  
             domainToCompanyDTO.setCompanyName(company);  

             // 发送结果  
             sendService.sendResult(domainToCompanyDTO);  
         } else {  
             sendService.ERROR("查询备案失败！请求状态码： {}", response.getStatusCode());  
         }  
     } catch (Exception e) {  
         sendService.ERROR("查询备案失败！ 错误信息：{}", e.getMessage());  
         throw new RuntimeException(e);  
     }  
     return null;  
 }  
}
```
