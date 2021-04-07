const COMPONENT_NAME_REGEXP = /(?:^|[-_/])(\w)/g;
const ROOT_COMPONENT_NAME = 'root';
const ANONYMOUS_COMPONENT_NAME = 'anonymous component';

const splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^/]+?|)(\.[^./]*|))(?:[/]*)$/;

const componentsCache = {};

function splitPath(filename) {
  var parts = splitPathRe.exec(filename);
  return parts ? parts.slice(1) : [];
}

function basename(path, ext) {
  var f = splitPath(path)[2];
  if (ext && f.substr(ext.length * -1) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
}

export function getComponentName(vm) {
  if (!vm) {
    return ANONYMOUS_COMPONENT_NAME;
  }
  if (vm.$root === vm) {
    return ROOT_COMPONENT_NAME;
  }
  if (!vm.$options) {
    return ANONYMOUS_COMPONENT_NAME;
  }
  if (vm.$options.name) {
    return vm.$options.name;
  }
  if (vm.$options._componentTag) {
    return vm.$options._componentTag;
  }
  // injected by vue-loader
  if (vm.$options.__file) {
    var unifiedFile = vm.$options.__file.replace(/^[a-zA-Z]:/, '').replace(/\\/g, '/');
    var filename = basename(unifiedFile, '.vue');
    return (
      componentsCache[filename] ||
      (componentsCache[filename] = filename.replace(COMPONENT_NAME_REGEXP, function (_, c) {
        return c ? c.toUpperCase() : '';
      }))
    );
  }
  return ANONYMOUS_COMPONENT_NAME;
}
