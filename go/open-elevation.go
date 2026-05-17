package voxgigopenelevationsdk

import (
	"github.com/voxgig-sdk/open-elevation-sdk/go/core"
	"github.com/voxgig-sdk/open-elevation-sdk/go/entity"
	"github.com/voxgig-sdk/open-elevation-sdk/go/feature"
	_ "github.com/voxgig-sdk/open-elevation-sdk/go/utility"
)

// Type aliases preserve external API.
type OpenElevationSDK = core.OpenElevationSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type OpenElevationEntity = core.OpenElevationEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type OpenElevationError = core.OpenElevationError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewLookupEntityFunc = func(client *core.OpenElevationSDK, entopts map[string]any) core.OpenElevationEntity {
		return entity.NewLookupEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewOpenElevationSDK = core.NewOpenElevationSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
