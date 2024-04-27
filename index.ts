import Plugins from "~plugins";

const PLUGINS = [
    require("./CumSay").default,
    require("./HiddenLinks").default,
    require("./typeforever").default,
];

for(const plugin of PLUGINS) {
    (plugin.tags ??= []).push("VilariStorms");
}

const name = Symbol("VilariStorms");
export default { name };

// This is called from api/Badges.ts, which is the first place that imports ~plugins
Set = new Proxy(Set, {
    construct(target, args) {
        if(Plugins && Plugins[name as any]) {
            Set = target;
            delete Plugins[name as any];
            for(const plugin of PLUGINS)
                Plugins[plugin.name] = plugin;
        }
        return Reflect.construct(target, args);
    }
});
