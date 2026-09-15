---
slug: sdk-overview
section: کیت توسعه (SDK)
title: معرفی کیت توسعه نرم‌افزار پراپ
path: کیت توسعه / معرفی
---

# کیت توسعه نرم‌افزار پراپ (Prop SDK)

با استفاده از کیت توسعه نرم‌افزار پایتون پراپ، ایجنت‌های سفارشی با منطق اختصاصی کسب‌وکار خود بسازید:
```python
from prop import Agent, Tool

agent = Agent(
    name="DataAnalyst",
    instructions="تحلیل داده‌های فروش و تولید گزارش هفتگی",
    tools=[Tool.database(), Tool.calculator()]
)

response = agent.run("خلاصه گزارش فروش هفته گذشته را استخراج کن")
print(response)
```
